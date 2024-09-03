import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'

interface ILike {
  firstName: string
  id: string
  isOnline: boolean
  photoUrl: string
  chatId: string
}

const fetchLikes = async () => {
  try {
    const response = await axiosInstance<ILike[]>('/chats/likes')
    return response.data
  } catch (error) {
    console.error('Error fetching likes:', error)
  }
}

export const useLikes = () => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: fetchLikes,
    refetchOnMount: true
  })
}
