'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { axiosInstance } from '~/libs/axios-instance'
import { Loader } from '~/ui/loader'

export const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined | null>(undefined)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.post('/user')
        if (res.data) {
          const { registrationStage } = res.data

          if (registrationStage !== 'DONE') {
            router.push('/register/' + registrationStage.toLowerCase())
          }

          setIsAuth(true)
        }
      } catch (error) {
        console.log(`Error on fetching user: ${error}`)
        setIsAuth(null)
      }
    }

    void fetchUser()
  }, [])

  if (typeof isAuth === 'undefined') {
    return <Loader fullScreen />
  }

  if (isAuth === null) {
    return <h1>хуй тебя не пустили</h1>
  }

  return <>{children}</>
}
