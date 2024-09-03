import { Skeleton } from '@nextui-org/skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { useLikes } from './use-likes'

export const Likes = () => {
  const { data = [], isLoading, isSuccess } = useLikes()

  const hasLikes = (
    <>
      {data?.map((user) => (
        <Link
          href={`/chats/${user.chatId}`}
          key={user.id}
          className='flex w-[75px] min-w-[75px] flex-col items-center gap-2 overflow-x-hidden'>
          <Image
            className='rounded-full'
            width={50}
            height={50}
            src={user.photoUrl}
            alt={user.firstName}
          />
          <span className='w-full truncate text-center text-sm'>
            {user.firstName}
          </span>
        </Link>
      ))}
    </>
  )

  const noLikes = (
    <>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className='flex w-[75px] min-w-[75px] flex-col items-center gap-2 overflow-x-hidden'>
          <Skeleton
            isLoaded={!isLoading}
            className='h-[50px] w-[50px] rounded-full'>
            <div className='h-[50px] w-[50px] rounded-full bg-default' />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} className='h-5 w-[75px] rounded-lg'>
            <div className='h-5 w-[75px] rounded-lg bg-default' />
          </Skeleton>
        </div>
      ))}
    </>
  )

  const content =
    !isLoading && isSuccess && data && data.length > 0 ? hasLikes : noLikes

  return (
    <div className='pb-4'>
      <h1 className='container fixed z-[1] w-full border-b-2 border-b-white/10 py-2 text-center text-2xl font-bold'>
        Чаты
      </h1>
      <h2 className='mb-3 mt-[66px] pl-4 text-lg font-semibold'>Лайки</h2>
      <div className='flex w-full gap-2 overflow-y-hidden px-4 scrollbar-hide'>
        {content}
      </div>
    </div>
  )
}
