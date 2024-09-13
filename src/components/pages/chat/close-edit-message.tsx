import { IoClose } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'
import { useChat } from './chat-provider'

interface IProps {
  clearMessage: () => void
}

export const CloseEditMessage = ({ clearMessage }: IProps) => {
  const { action, setAction } = useChat()

  if (!action?.copy) {
    return
  }

  const onClose = () => {
    setAction(null)
    clearMessage()
  }

  return (
    <div className='flex items-center gap-4 px-3 py-1'>
      <MdModeEditOutline size={25} />
      <div className='mr-auto'>
        <span className='text-xs font-medium text-primary'>Редактирование</span>
        <p className='truncate text-xs text-gray-300'>{action.copy.text}</p>
      </div>
      <button className='p-1' onClick={onClose}>
        <IoClose size={20} />
      </button>
    </div>
  )
}
