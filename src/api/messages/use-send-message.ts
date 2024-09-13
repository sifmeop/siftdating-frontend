import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { axiosInstance } from '~/libs/axios-instance'
import { IChat } from '~/pages/chats/use-get-chats'
import { IUser } from '../user'
import { IMessage } from './use-get-messages'

interface IBody {
  chatId: string
  text: string
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['messages'],
    mutationFn: async (body: IBody) => {
      try {
        const res = await axiosInstance.post('/messages', body)
        return res.data
      } catch (error) {
        console.log('Error in useSendMessage: ', error)
      }
    },
    onSuccess: (data: IMessage) => {
      const previousMessages = queryClient.getQueryData([
        'messages',
        data.chatId
      ]) as IMessage[]

      const isHasMessage = previousMessages?.find(
        (message) => message.id === data.id
      )

      if (isHasMessage) return

      if (previousMessages) {
        const newMessages = previousMessages.concat(data)

        queryClient.setQueryData(['messages', data.chatId], newMessages)
      }

      const pathname = window.location.pathname

      if (pathname !== `/chats/${data.chatId}`) {
        toast('You have new message')
      }

      const previousChats = queryClient.getQueryData(['chats']) as
        | IChat[]
        | undefined

      if (previousChats) {
        const chatIndex = previousChats.findIndex(
          (chat) => chat.id === data.chatId
        )

        if (chatIndex === -1) return
        const currentChat = previousChats[chatIndex]

        const updatedChat: IChat = {
          ...currentChat,
          lastMessage: data
        }

        const user = queryClient.getQueryData(['user']) as IUser

        if (data.userId !== user.id) {
          updatedChat.unRead = currentChat.unRead + 1
        }

        const newChats: IChat[] = [
          ...previousChats.slice(0, chatIndex),
          updatedChat,
          ...previousChats.slice(chatIndex + 1)
        ]

        queryClient.setQueryData(['chats'], newChats)
      }
    }
  })
}
