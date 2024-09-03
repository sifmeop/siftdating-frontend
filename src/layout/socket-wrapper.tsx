'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { IMessage } from '~/api/messages'
import { API_URL, NODE_ENV } from '~/utils/env'

export const SocketWrapper = ({ children }: React.PropsWithChildren) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const initData = Telegram?.WebApp?.initData

    if (NODE_ENV !== 'development' && !initData) {
      return
    }

    const socket = io(new URL(API_URL).host, {
      path: '/user',
      transports: ['websocket'],
      query: { initData }
    })

    socket.on('connect', () => {
      console.log('socket connected')
    })

    socket.on('notification', (data) => {
      console.log('notification', data)
    })

    socket.on('read-messages', (data) => {
      // console.log('notification', data)
      const previousData = queryClient.getQueryData([
        'messages',
        data.chatId
      ]) as IMessage[]

      if (!previousData) {
        return
      }

      const updatedData = previousData.map((message) => {
        if (data.messagesIds.includes(message.id)) {
          return {
            ...message,
            readAt: data.readAt
          }
        } else {
          return message
        }
      })

      queryClient.setQueryData(['messages', data.chatId], updatedData)
    })

    socket.on('disconnect', () => {
      console.log('socket disconnected')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return <>{children}</>
}
