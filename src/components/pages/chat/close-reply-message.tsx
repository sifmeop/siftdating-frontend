import { BsReply } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { useChat } from './chat-provider'

interface IProps {
  clearMessage: () => void
}

export const CloseReplyMessage = ({ clearMessage }: IProps) => {
  const { action, setAction } = useChat()

  if (!action?.reply) {
    return
  }

  const onClose = () => {
    setAction(null)
    clearMessage()
  }

  return (
    <div className='flex items-center gap-4 px-3 py-1'>
      <BsReply size={25} />
      <div className='mr-auto'>
        <span className='text-xs font-medium text-primary'>
          В ответ {action.reply.name}
        </span>
        <p className='truncate text-xs text-gray-300'>{action.reply.text}</p>
      </div>
      <button className='p-1' onClick={onClose}>
        <IoClose size={20} />
      </button>
    </div>
  )
}
