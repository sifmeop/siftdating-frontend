import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  const toChats = () => router.push('/chats')

  return useQuery({
    queryKey: ['messages', chatId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<IMessage[]>(
          `/messages?chatId=${chatId}`
        )
        return res.data
      } catch (error) {
        console.log('Error in useGetMessages: ', error)

        toChats()
      }
    }
  })
}
