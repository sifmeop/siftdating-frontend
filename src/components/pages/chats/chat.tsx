import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { IChat } from './use-get-chats'

type IProps = IChat

export const Chat = ({ id, lastMessage, user, unRead }: IProps) => {
  const createdAt = dayjs(lastMessage?.createdAt).format('HH:mm')

  return (
    <Link href={`/chats/${id}`} className='flex w-full items-center gap-4 px-4'>
      <Image
        className='rounded-full'
        width={50}
        height={50}
        src={user.photo}
        alt={user.firstName}
      />
      <div className='flex w-full min-w-0 flex-col gap-1'>
        <div className='flex items-center gap-2.5 truncate font-semibold'>
          <p>{user.firstName}</p>
          {user.id === lastMessage?.userId && (
            <span className='rounded-full bg-white/10 px-2 py-1 text-xs'>
              ТВОЯ ОЧЕРЕДЬ
            </span>
          )}
        </div>
        <span className='truncate text-xs text-gray-300'>
          {lastMessage?.text}
        </span>
      </div>
      {(lastMessage?.createdAt || unRead > 0) && (
        <>
          <div className='flex flex-col gap-1'>
            {lastMessage?.createdAt && (
              <span className='text-xs text-gray-300'>{createdAt}</span>
            )}
            {unRead > 0 && (
              <div className='ml-auto w-fit rounded-full bg-primary px-2 text-white'>
                {unRead}
              </div>
            )}
          </div>
        </>
      )}
    </Link>
  )
}
