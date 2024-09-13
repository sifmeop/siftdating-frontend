import { IUser, useGetUser } from '~/api/user'

export const useUser = () => {
  const { data } = useGetUser()

  return data as IUser
}
