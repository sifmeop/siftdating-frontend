import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { axiosInstance } from '~/libs/axios-instance'

export interface IUser {
  id: string
  telegramId: number
  firstName: string
  photoKeys: string[]
  city: string
  gender: string
  intention: string
  birthDate: string
  isOnline: boolean
  lastSeen: any
  registrationStage: string
  isVerified: boolean
  aboutMe: string
  deletedAt: any
  createdAt: string
  isBot: boolean
}

export const useGetUser = () => {
  const router = useRouter()

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get<IUser>('/user')

        if (res.data) {
          const { registrationStage } = res.data

          if (registrationStage !== 'DONE') {
            router.push('/register/' + registrationStage.toLowerCase())
          }
        }

        return res.data
      } catch (error) {
        console.log(`Error on fetching user: ${error}`)
        return null
      }
    }
  })
}
