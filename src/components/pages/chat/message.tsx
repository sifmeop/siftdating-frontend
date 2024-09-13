import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import { cn } from '@nextui-org/theme'
import dayjs from 'dayjs'
import { useState } from 'react'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5'
import { IMessage } from '~/api/messages'
import { useUser } from '~/hooks/use-user'
import { useActions } from './actions/use-actions'
import { DeleteMessagesModal } from './delete-messages-modal'

type IProps = IMessage

const name = 'CHICK'

export const Message = ({
  id,
  text,
  createdAt,
  readAt,
  userId,
  chatId,
  ...props
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { onAction, actions } = useActions(readAt, userId)
  const { id: currentUserId } = useUser()
  const date = new Date(createdAt)
  const time = dayjs(date).format('HH:mm')
  const Icon = readAt ? IoCheckmarkDoneOutline : IoCheckmarkOutline

  const isMyMessage = userId === currentUserId

  const handleAction = (key: string, onOpen: () => void) => {
    if (key === 'delete') {
      setIsOpen(false)
      onOpen()
      return
    }

    onAction({
      id,
      text,
      createdAt,
      readAt,
      userId,
      key,
      name,
      chatId,
      ...props
    })
  }

  return (
    <DeleteMessagesModal name={name} chatId={chatId} messagesId={id}>
      {(onOpen) => (
        <Dropdown
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          className='rounded-md p-0'
          backdrop='blur'>
          <DropdownTrigger>
            <div
              id={`message-${id}`}
              className={cn(
                'flex w-fit gap-1 self-start rounded-lg bg-black px-3 py-2',
                {
                  'self-end bg-white/10': isMyMessage
                }
              )}>
              <p>{text}</p>
              <span className='self-end text-xs text-gray-400'>{time}</span>
              <Icon size={18} className='self-end' />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            variant='flat'
            aria-label='Actions'
            className='p-0'
            onAction={(key) => {
              handleAction(key.toString(), onOpen)
            }}
            disabledKeys={['read']}>
            {actions.map(({ key, text, Icon }) => (
              <DropdownItem
                id={key}
                key={key}
                className='gap-4 rounded-none px-4 py-2 first:rounded-t-md last:rounded-b-md'
                startContent={<Icon size={20} />}>
                {text}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </DeleteMessagesModal>
  )
}
