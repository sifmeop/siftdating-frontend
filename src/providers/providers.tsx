'use client'

import { NextUIProvider } from '@nextui-org/system'
import { TanstackQueryProvider } from './tanstack-query'
import { TelegramProvider } from './telegram-provider'
import { ToastProvider } from './toast-provider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      <NextUIProvider>
        <TelegramProvider>{children}</TelegramProvider>
      </NextUIProvider>
      <ToastProvider />
    </TanstackQueryProvider>
  )
}
