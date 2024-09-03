import { cn } from '@nextui-org/theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaCircleUser } from 'react-icons/fa6'
import { IoChatbubblesSharp } from 'react-icons/io5'
import { TbCardsFilled } from 'react-icons/tb'
import styles from './layout.module.scss'

const links = [
  { title: 'Profile', href: '/profile', Icon: FaCircleUser },
  { title: 'Discover', href: '/', Icon: TbCardsFilled },
  { title: 'Chats', href: '/chats', Icon: IoChatbubblesSharp }
]

const hiddenLinks = ['/register', '/chats/']

export const Navigation = () => {
  const pathname = usePathname()

  const isHidden = hiddenLinks.some((link) => pathname.startsWith(link))

  if (isHidden) {
    return
  }

  return (
    <nav className={styles.nav}>
      <ul>
        {links.map(({ title, href, Icon }) => (
          <li key={title}>
            <Link
              href={href}
              className={cn(styles.link, {
                [styles.link_active]: href === pathname
              })}>
              <Icon size={20} />
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
