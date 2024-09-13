'use client'

import { useGetUser } from '~/api/user'
import { Loader } from '~/ui/loader'

export const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const { data, isLoading, error } = useGetUser()

  if (error) {
    return <h1>{error.message}</h1>
  }

  if (isLoading || !data) {
    return <Loader fullScreen />
  }

  return <>{children}</>
}
