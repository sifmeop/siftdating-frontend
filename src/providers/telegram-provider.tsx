import { useEffect } from 'react'

export const TelegramProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    const tg = window?.Telegram?.WebApp
    console.log(tg?.initDataUnsafe?.user?.id)
  }, [])

  return <>{children}</>
}
