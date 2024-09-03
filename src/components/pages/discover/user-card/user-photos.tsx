import Image from 'next/image'
import styles from './user-card.module.scss'

interface IProps {
  isBot: boolean
  gender: string
  photoUrls: string[]
}

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

const botUrl = 'https://api.dicebear.com/9.x/avataaars/svg?seed'

const botNames = {
  MALE: ['Max', 'Cuddles', 'Buddy', 'Dusty', 'Baby'],
  FEMALE: ['Sammy', 'Ginger', 'Shadow', 'Annie', 'Sophie']
}

const botPhotos = (gender: string) => {
  const names = botNames[gender as keyof typeof botNames]
  const photo1 = names[getRandomNumber(0, names.length)]
  const leftNames1 = names.filter((name) => name !== photo1)
  const photo2 = leftNames1[getRandomNumber(0, leftNames1.length)]
  const leftNames2 = names.filter((name) => name !== photo2)
  const photo3 = leftNames2[getRandomNumber(0, leftNames2.length)]
  return [photo1, photo2, photo3]
}

export const UserPhotos = ({ isBot, gender, photoUrls }: IProps) => {
  const photos = isBot ? botPhotos(gender) : photoUrls

  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        {photos.map((url, index) => {
          const img = isBot ? `${botUrl}=${url}` : url
          return (
            <div key={index} className={styles.slide}>
              <div className={styles.image}>
                <Image src={img} alt={String(index)} width={300} height={300} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
