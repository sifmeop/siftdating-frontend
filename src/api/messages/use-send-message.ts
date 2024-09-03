import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'

interface IBody {
  chatId: string
  text: string
}

export const useSendMessage = () => {
  return useMutation({
    mutationKey: ['messages'],
    mutationFn: async (body: IBody) => {
      try {
        const res = await axiosInstance.post('/messages', body)
        return res.data
      } catch (error) {
        console.log('error', error)
      }
    }
  })
}
