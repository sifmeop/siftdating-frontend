import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'
import styles from './chat.module.scss'

export const UserHeader = () => {
  const router = useRouter()

  const goBack = () => router.push('/chats')

  return (
    <div className={styles.user_header}>
      <button className='mr-5' onClick={goBack}>
        <IoIosArrowBack size={30} />
      </button>
      <Image
        className='rounded-full'
        width={50}
        height={50}
        src={'https://api.dicebear.com/9.x/avataaars-neutral/svg'}
        alt={'asdasd'}
      />
      <div className='flex w-full min-w-0 flex-col gap-1'>
        <p className='truncate font-semibold'>Лиза</p>
        <span className='truncate text-xs text-gray-300'>
          Была онлайн 7 часов назад
        </span>
      </div>
    </div>
  )
}
