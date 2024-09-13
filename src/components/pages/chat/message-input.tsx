import { memo, useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useSendMessage } from '~/api/messages'
import { MyButton } from '~/ui/my-button'
import { MyInput } from '~/ui/my-input'
import { useChat } from './chat-provider'
import styles from './chat.module.scss'
import { CloseEditMessage } from './close-edit-message'
import { CloseReplyMessage } from './close-reply-message'

interface IProps {
  chatId: string
}

export const MessageInput = memo(({ chatId }: IProps) => {
  const { action, setAction } = useChat()
  const [message, setMessage] = useState('')

  const { mutateAsync } = useSendMessage()

  useEffect(() => {
    if (action?.copy) {
      setMessage(action.copy.text)
    }
  }, [action])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const clearMessage = () => {
    setMessage('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const onClick = async () => {
    if (message.length === 0) return

    mutateAsync({ chatId, text: message })

    clearMessage()
  }

  return (
    <>
      <CloseReplyMessage clearMessage={clearMessage} />
      <CloseEditMessage clearMessage={clearMessage} />
      <div className={styles.input}>
        <MyInput
          placeholder='Message'
          value={message}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClear={clearMessage}
        />
        {message.length > 0 && (
          <MyButton isIconOnly onClick={onClick}>
            <IoSend />
          </MyButton>
        )}
      </div>
    </>
  )
})

MessageInput.displayName = 'MessageInput'
