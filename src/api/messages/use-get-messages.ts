import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'

export interface IMessage {
  chatId: string
  createdAt: string
  deletedAt: string | null
  editedAt: string | null
  id: string
  text: string
  userId: string
  readAt: string | null
}

export const useGetMessages = (chatId: string) => {
  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<IMessage[]>(
          `/messages?chatId=${chatId}`
        )
        return res.data
      } catch (error) {
        const message = (error as Error).message
        console.log('message', message)

        if (error && typeof error === 'object' && 'data' in error) {
          console.log('error.data', error.data)
        }

        console.log('error', error)
      }
    }
  })
}
