import Image from 'next/image'
import Link from 'next/link'
import { IChat } from './use-get-chats'

type IProps = IChat

export const Chat = ({ id, lastMessage, user }: IProps) => {
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
        <p className='truncate font-semibold'>{user.firstName}</p>
        <span className='truncate text-xs text-gray-300'>
          {lastMessage?.text}
        </span>
      </div>
    </Link>
  )
}
