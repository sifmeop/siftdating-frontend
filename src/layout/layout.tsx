'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AuthWrapper } from './auth-wrapper'
import styles from './layout.module.scss'
import { Navigation } from './navigation'
import { SocketWrapper } from './socket-wrapper'

export const Layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter()

  useEffect(() => {
    Telegram.WebApp.BackButton.show()

    Telegram.WebApp.BackButton.onClick(() => {
      if (window.location.pathname === '/') {
        Telegram.WebApp.close()
      } else {
        router.back()
      }
    })
  }, [])

  return (
    <AuthWrapper>
      <SocketWrapper>
        <div className={styles.layout}>
          {children}
          <Navigation />
        </div>
      </SocketWrapper>
    </AuthWrapper>
  )
}
