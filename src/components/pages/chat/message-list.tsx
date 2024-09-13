import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { IMessage } from '~/api/messages'
import { useReadMessage } from '~/api/messages/use-read-messages'
import { useUser } from '~/hooks/use-user'
import { Message } from './message'

interface IProps {
  chatId: string
  messages: IMessage[]
}

export const MessageList = ({ chatId, messages }: IProps) => {
  const messagesRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const { id: userId } = useUser()
  const { mutateAsync } = useReadMessage()

  useEffect(() => {
    setTimeout(() => {
      messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight)
    }, 50)
  }, [messages])

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
            // setMessages(updatedData)
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
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  )
}
