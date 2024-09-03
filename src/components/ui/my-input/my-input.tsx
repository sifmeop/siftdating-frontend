import { Input, InputProps } from '@nextui-org/input'
import { cn } from '@nextui-org/theme'

type IProps = InputProps

export const MyInput = ({ className, ...props }: IProps) => {
  return <Input radius='sm' className={cn(className)} {...props} />
}
