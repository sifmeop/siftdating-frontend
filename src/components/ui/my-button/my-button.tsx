import { Button, ButtonProps } from '@nextui-org/button'
import { cn } from '@nextui-org/theme'

type IProps = ButtonProps

export const MyButton = ({ className, ...props }: IProps) => {
  return <Button radius='sm' className={cn(className)} {...props} />
}
