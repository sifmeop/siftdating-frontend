import { MdCheck, MdClose } from 'react-icons/md'
import { MyButton } from '~/ui/my-button'
import { ReactionType, useReaction } from './use-reaction'

interface IProps {
  targetId: string
}

export const UserButtons = ({ targetId }: IProps) => {
  const { isPending, onClick, clickedType } = useReaction()

  return (
    <div className='flex gap-3'>
      <MyButton
        color={clickedType === ReactionType.DISLIKE ? 'danger' : 'default'}
        fullWidth
        disabled={isPending}
        onClick={() => onClick({ type: ReactionType.DISLIKE, targetId })}>
        <MdClose size={20} />
      </MyButton>
      <MyButton
        color={clickedType === ReactionType.LIKE ? 'success' : 'primary'}
        fullWidth
        disabled={isPending}
        onClick={() => onClick({ type: ReactionType.LIKE, targetId })}>
        <MdCheck size={20} />
      </MyButton>
    </div>
  )
}
