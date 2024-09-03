'use client'

import { Spinner } from '@nextui-org/spinner'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/libs/axios-instance'
import { UserCard } from './user-card/user-card'

export const Discover = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['discover'],
    queryFn: async () => {
      try {
        return await axiosInstance('/discover')
      } catch (error) {
        console.log('error', error)
      }
    }
  })

  const users = data?.data ?? []

  const slicedUsers = users.slice(0, 1)

  if (isLoading) {
    return <Spinner />
  }

  if (slicedUsers.length === 0) {
    return (
      <div className='flex flex-col justify-center gap-3 px-2 text-center'>
        <h1>Вы просмотрели всех доступных пользователей!</h1>
        <p className='text-sm text-white/70'>
          Приходите позже, чтобы увидеть новых пользователей.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* <Match /> */}
      {slicedUsers.map((user: any) => (
        <UserCard key={user.id} {...user} />
      ))}
    </>
  )
}
