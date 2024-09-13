import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'
import { IChat } from '~/pages/chats/use-get-chats'
import { IMessage } from './use-get-messages'

interface IBody {
  chatId: string
  messagesIds: string[]
}

export const useReadMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['read-messages'],
    mutationFn: async (body: IBody) => {
      try {
        const res = await axiosInstance.put('/messages/read', body)
        return res.data
      } catch (error) {
        console.log('Error in useReadMessage: ', error)
      }
    },
    onMutate: async ({ chatId, messagesIds }) => {
      await queryClient.cancelQueries({ queryKey: ['read-messages'] })

      const previousData = queryClient.getQueryData([
        'messages',
        chatId
      ]) as IMessage[]

      if (!previousData) {
        return { previousData }
      }

      const readAt = new Date().toISOString()

      const updatedData = previousData.map((message) => {
        if (messagesIds.includes(message.id)) {
          return {
            ...message,
            readAt
          }
        } else {
          return message
        }
      })

      queryClient.setQueryData(['messages', chatId], updatedData)

      const chats = queryClient.getQueryData(['chats']) as IChat[] | undefined

      if (chats) {
        const chatIndex = chats.findIndex((chat) => chat.id === chatId)

        if (chatIndex !== -1) {
          chats[chatIndex].unRead -= messagesIds.length
          queryClient.setQueryData(['chats'], chats)
        }
      }

      return { previousData }
    }
  })
}
