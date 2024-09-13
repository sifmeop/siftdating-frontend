import Image from 'next/image'
import { memo } from 'react'
import styles from './chat.module.scss'

export const UserHeader = memo(() => {
  return (
    <div className={styles.user_header}>
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
})

UserHeader.displayName = 'UserHeader'
