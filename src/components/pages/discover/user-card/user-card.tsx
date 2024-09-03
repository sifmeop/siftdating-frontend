import { GrLocation } from 'react-icons/gr'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { getZodiacSign } from '~/utils/get-zodiac-sign'
import { UserButtons } from './user-buttons'
import styles from './user-card.module.scss'
import { UserPhotos } from './user-photos'

interface IProps {
  aboutMe: string | null
  birthDate: string
  city: string
  createdAt: string
  deletedAt: string | null
  firstName: string
  gender: string
  id: string
  intention: string
  isOnline: false
  isVerified: false
  lastSeen: string | null
  photoUrls: string[]
  registrationStage: string
  telegramId: number
  isBot: boolean
}

export const UserCard = ({
  id,
  firstName,
  birthDate,
  city,
  aboutMe,
  photoUrls,
  isBot,
  gender
}: IProps) => {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear()

  return (
    <div className={styles.card}>
      <UserPhotos isBot={isBot} gender={gender} photoUrls={photoUrls} />
      <div className='p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            {firstName}, {age}{' '}
            <VscVerifiedFilled className='text-blue-500' size={22} />
          </div>
          <div className='flex items-center gap-2'>
            <GrLocation /> {city} {getZodiacSign(birthDate)}
          </div>
          {/* {aboutMe && <p className='text-sm'>{aboutMe}</p>} */}
          <UserButtons targetId={id} />
        </div>
      </div>
    </div>
  )
}
