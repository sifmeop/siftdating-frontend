import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'

export interface IChat {
  id: string
  user: IUser
  lastMessage: ILastMessage | null
  createdAt: string
}

interface IUser {
  id: string
  firstName: string
  photo: string
  isOnline: boolean
}

interface ILastMessage {
  id: string
  text: string
  chatId: string
  userId: string
  createdAt: string
  editedAt: string | null
  deletedAt: string | null
}

export const useGetChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      try {
        const data = await axiosInstance<IChat[]>('/chats')
        return data.data
      } catch (error) {
        console.log('error', error)
      }
    }
  })
}
