'use client'

import { useGetMessages } from '~/api/messages'
import { Loader } from '~/ui/loader'
import styles from './chat.module.scss'
import { MessageInput } from './message-input'
import { MessageList } from './message-list'
import { UserHeader } from './user-header'

interface IProps {
  chatId: string
}

export const Chat = ({ chatId }: IProps) => {
  const { data } = useGetMessages(chatId)

  if (!data) {
    return <Loader fullScreen />
  }

  return (
    <div className={styles.chat}>
      <UserHeader />
      <MessageList chatId={chatId} initMessages={data} />
      <MessageInput chatId={chatId} />
    </div>
  )
}
