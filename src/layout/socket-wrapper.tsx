'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import io, { Socket } from 'socket.io-client'
import { IMessage } from '~/api/messages'
import { useUser } from '~/hooks/use-user'
import { IChat } from '~/pages/chats/use-get-chats'
import { API_URL, NODE_ENV } from '~/utils/env'

export const SocketWrapper = ({ children }: React.PropsWithChildren) => {
  const queryClient = useQueryClient()
  const { id: userId } = useUser()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const handleConnect = () => {
      const initData = Telegram?.WebApp?.initData

      if (NODE_ENV !== 'development' && !initData) {
        return
      }

      if (!socketRef.current) {
        socketRef.current = io(new URL(API_URL).host, {
          path: '/user',
          transports: ['websocket'],
          query: { initData }
        })
      }

      const socket = socketRef.current

      socket.on('connect', () => {
        console.log('socket connected')
      })

      socket.on('notification', (data) => {
        console.log('notification', data)
      })

      socket.on('read-messages', (data) => {
        const previousMessages = queryClient.getQueryData([
          'messages',
          data.chatId
        ]) as IMessage[]

        if (!previousMessages) return

        const messageIdsSet = new Set(data.messagesIds)

        const updatedData = previousMessages.map((message) =>
          messageIdsSet.has(message.id)
            ? { ...message, readAt: data.readAt }
            : message
        )

        queryClient.setQueryData(['messages', data.chatId], updatedData)

        const previousChats = queryClient.getQueryData(['chats']) as
          | IChat[]
          | undefined

        if (!previousChats) return

        const chatIndex = previousChats.findIndex(
          (chat) => chat.id === data.chatId
        )

        if (chatIndex === -1) return

        const currentChat = previousChats[chatIndex]

        const updatedChat: IChat = {
          ...currentChat,
          unRead: currentChat.unRead - data.messagesIds.length
        }

        if (
          updatedChat.lastMessage?.id &&
          data.messagesIds.includes(updatedChat.lastMessage.id)
        ) {
          updatedChat.lastMessage.readAt = data.readAt
        }

        if (updatedChat.unRead < 0) {
          updatedChat.unRead = 0
        }

        const newChats: IChat[] = [
          ...previousChats.slice(0, chatIndex),
          updatedChat,
          ...previousChats.slice(chatIndex + 1)
        ]

        queryClient.setQueryData(['chats'], newChats)
      })

      socket.on('new-message', (data) => {
        const pathname = window.location.pathname

        if (pathname !== `/chats/${data.chatId}`) {
          toast('You have new message')
        }

        const previousChats = queryClient.getQueryData(['chats']) as
          | IChat[]
          | undefined

        if (previousChats) {
          const chatIndex = previousChats.findIndex(
            (chat) => chat.id === data.chatId
          )

          if (chatIndex === -1) return
          const currentChat = previousChats[chatIndex]

          const updatedChat: IChat = {
            ...currentChat,
            lastMessage: data
          }

          if (data.userId !== userId) {
            updatedChat.unRead = currentChat.unRead + 1
          }

          const newChats: IChat[] = [
            ...previousChats.slice(0, chatIndex),
            updatedChat,
            ...previousChats.slice(chatIndex + 1)
          ]

          queryClient.setQueryData(['chats'], newChats)
        }

        const previousMessages = queryClient.getQueryData([
          'messages',
          data.chatId
        ]) as IMessage[]

        if (previousMessages) {
          const newMessages = previousMessages.concat(data)

          queryClient.setQueryData(['messages', data.chatId], newMessages)
        }
      })

      socket.on('deleted-messages', (data) => {
        const oldMessages = queryClient.getQueryData([
          'messages',
          data.chatId
        ]) as IMessage[] | undefined
        const previousChats = queryClient.getQueryData(['chats']) as
          | IChat[]
          | undefined

        let filteredMessages: IMessage[] =
          oldMessages?.filter(
            (message) => !data.messagesIds.includes(message.id)
          ) || []

        if (oldMessages) {
          queryClient.setQueryData(['messages', data.chatId], filteredMessages)
        }

        let lastMessage: IMessage | null = filteredMessages.at(-1) ?? null

        if (previousChats) {
          const chatIndex = previousChats.findIndex(
            (chat) => chat.id === data.chatId
          )

          if (chatIndex !== -1) {
            const currentChat = previousChats[chatIndex]
            const lastMessageId = currentChat.lastMessage?.id

            if (lastMessageId && data.messagesIds.includes(lastMessageId)) {
              const updatedChat = {
                ...currentChat,
                lastMessage
              }

              const newChats = [...previousChats]
              newChats[chatIndex] = updatedChat

              queryClient.setQueryData(['chats'], newChats)
            }
          }
        }
      })

      socket.on('disconnect', () => {
        console.log('socket disconnected')
      })
    }

    handleConnect()

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [queryClient])

  return <>{children}</>
}
