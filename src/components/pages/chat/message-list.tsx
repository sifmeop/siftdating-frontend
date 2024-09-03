import { cn } from '@nextui-org/theme'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5'
import { IMessage } from '~/api/messages'
import { useReadMessage } from '~/api/messages/use-read-messages'
import { pusherClient } from '~/libs/pusher'
import { IChat } from '../chats/use-get-chats'

interface IProps {
  chatId: string
  initMessages: IMessage[]
}

export const MessageList = ({ chatId, initMessages }: IProps) => {
  const [messages, setMessages] = useState<IMessage[]>(initMessages)
  const firstRenderMessages = useRef(true)
  const messagesRef = useRef<HTMLDivElement>(null)
  const userId = '842411e1-2b4a-4da8-b5be-ba638f043e83'
  const queryClient = useQueryClient()
  const { mutateAsync } = useReadMessage()

  useEffect(() => {
    if (!firstRenderMessages.current || !messagesRef.current) {
      return
    }

    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight)

    return () => {
      firstRenderMessages.current = false
    }
  }, [messages])

  useEffect(() => {
    const channelName = `chat-${chatId}`

    const channel = pusherClient.subscribe(channelName)

    channel.bind('message', (data: IMessage) => {
      setMessages((prev) => [...prev, data])
      const chats = queryClient.getQueryData(['chats']) as IChat[] | undefined

      if (chats) {
        const chat = chats.find((chat) => chat.id === chatId)

        if (chat) {
          chat.lastMessage = data
          queryClient.setQueryData(['chats'], chats)
        }
      }

      const messages = queryClient.getQueryData([
        'messages',
        chatId
      ]) as IMessage[]

      messages.push(data)

      queryClient.setQueryData(['messages', chatId], messages)

      if (data.userId === userId) {
        messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight)
      }
    })

    return () => {
      pusherClient.unsubscribe(channelName)
    }
  }, [])

  useEffect(() => {
    if (messages.length === 0 || !messagesRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const notReadMessages = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const messageId = entry.target.id.replace('message-', '')
            return friendMessages.find((message) => message.id === messageId)!
          })

        if (notReadMessages.length > 0) {
          const messagesIds = notReadMessages.map((m) => m.id)

          const previousData = queryClient.getQueryData([
            'messages',
            chatId
          ]) as IMessage[]

          const updatedData = previousData.map((message) => {
            if (messagesIds.includes(message.id)) {
              return {
                ...message,
                readAt: new Date().toISOString()
              }
            } else {
              return message
            }
          })

          setTimeout(() => {
            queryClient.setQueryData(['messages', chatId], updatedData)
            setMessages(updatedData)
          }, 1000)

          mutateAsync({ chatId, messagesIds })
        }
      },
      { threshold: 0.1 }
    )

    const friendMessages = messages.filter(
      (message) => message.userId !== userId && !message.readAt
    )

    friendMessages.forEach((message) => {
      const messageElement = document.getElementById(`message-${message.id}`)
      if (messageElement) {
        observer.observe(messageElement)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [messages])

  return (
    <div
      ref={messagesRef}
      className='no-scroll flex h-full flex-col gap-2 overflow-y-auto bg-black/20 p-2'>
      {messages.map((message) => {
        const date = new Date(message.createdAt)
        const time = dayjs(date).format('HH:mm')
        const Icon = message.readAt
          ? IoCheckmarkDoneOutline
          : IoCheckmarkOutline

        return (
          <div
            key={message.id}
            id={`message-${message.id}`}
            className={cn(
              'flex w-fit gap-1 self-start rounded-lg bg-black px-3 py-2',
              {
                'self-end bg-white/10': message.userId === userId
              }
            )}>
            <p>{message.text}</p>
            <span className='self-end text-xs text-gray-400'>{time}</span>
            <Icon size={18} className='self-end' />
          </div>
        )
      })}
    </div>
  )
}
