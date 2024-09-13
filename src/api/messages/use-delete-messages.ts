import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'
import { IChat } from '~/pages/chats/use-get-chats'
import { IMessage } from './use-get-messages'

interface IDeleteMessageBody {
  chatId: string
  messagesIds: string[]
}

export const useDeleteMessages = () => {
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationKey: ['deleted-messages'],
    mutationFn: async (data: IDeleteMessageBody) => {
      try {
        await axiosInstance.delete('/messages', { data })
      } catch (error) {
        console.log('Error in useDeleteMessages: ', error)
      }
    },
    onMutate: (data) => {
      const oldMessages = queryClient.getQueryData([
        'messages',
        data.chatId
      ]) as IMessage[] | undefined
      const previousChats = queryClient.getQueryData(['chats']) as
        | IChat[]
        | undefined

      let filteredMessages: IMessage[] =
        oldMessages?.filter(
          (message) => !data.messagesIds.includes(message.id)
        ) || []

      if (oldMessages) {
        queryClient.setQueryData(['messages', data.chatId], filteredMessages)
      }

      let lastMessage: IMessage | null = filteredMessages.at(-1) ?? null

      if (previousChats) {
        const chatIndex = previousChats.findIndex(
          (chat) => chat.id === data.chatId
        )

        if (chatIndex !== -1) {
          const currentChat = previousChats[chatIndex]
          const lastMessageId = currentChat.lastMessage?.id

          if (lastMessageId && data.messagesIds.includes(lastMessageId)) {
            const updatedChat = {
              ...currentChat,
              lastMessage
            }

            const newChats = [...previousChats]
            newChats[chatIndex] = updatedChat

            queryClient.setQueryData(['chats'], newChats)
          }
        }
      }
    }
  })

  const onDelete = async (data: IDeleteMessageBody) => {
    await mutateAsync(data)
  }

  return { onDelete }
}
