import { Loader } from '~/ui/loader'
import { Chat } from './chat'
import { useGetChats } from './use-get-chats'

export const ChatsList = () => {
  const { data, isError, isLoading } = useGetChats()

  return (
    <div className='flex h-full w-full flex-col gap-3 overflow-x-auto'>
      <h2 className='px-4 text-lg font-semibold'>Сообщения</h2>
      {data?.map((chat) => <Chat key={chat.id} {...chat} />)}
      {!isLoading && data && data.length === 0 && (
        <p className='text-center'>Нет чатов</p>
      )}
      {isLoading && <Loader />}
      {isError && <p className='text-center'>Что-то пошло не так</p>}
    </div>
  )
}
