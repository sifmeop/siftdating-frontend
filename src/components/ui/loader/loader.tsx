import { Spinner } from '@nextui-org/spinner'
import { cn } from '@nextui-org/theme'

interface IProps {
  fullScreen?: boolean
}

export const Loader = ({ fullScreen }: IProps) => {
  return (
    <div
      className={cn('grid h-full w-full place-items-center', {
        'h-dvh': fullScreen
      })}>
      <Spinner size='lg' />
    </div>
  )
}
