import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'
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
        console.log('error', error)
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

      const updatedData = previousData.map((message) => {
        if (messagesIds.includes(message.id)) {
          return {
            ...message,
            readAt: new Date().toISOString()
          }
        } else {
          return message
        }
      })

      queryClient.setQueryData(['messages', chatId], updatedData)

      return { previousData }
    }
  })
}
