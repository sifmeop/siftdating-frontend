import { Key } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { IMessage } from '~/api/messages'
import { useUser } from '~/hooks/use-user'
import { copyToClipboard } from '~/utils/copy'
import { useDeleteMessage } from './use-delete-message'
import { useEditMessage } from './use-edit-message'
import { useReplyMessage } from './use-replay-message'
import { useSelectMessage } from './use-select-message'

const getReadAtText = (readAt: string) => {
  const nowDateString = new Date().toDateString()
  const readAtDate = new Date(readAt)
  const readAtDateString = new Date(readAt).toDateString()
  const hours = String(readAtDate.getHours()).padStart(2, '0')
  const minutes = String(readAtDate.getMinutes()).padStart(2, '0')
  const time = `${hours}:${minutes}`

  const isToday = nowDateString === readAtDateString

  if (isToday) {
    return `Сегодня в ${time}`
  }

  const yesterdayDate = new Date()
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)
  const yesterdayDateString = yesterdayDate.toDateString()

  const isYesterday = yesterdayDateString === readAtDateString

  if (isYesterday) {
    return `Вчера в ${time}`
  }

  const day = String(readAtDate.getDate())
  const monthName = readAtDate.toLocaleString('default', { month: 'long' })

  return `${day} ${monthName} в ${time}`
}

interface IActionData extends IMessage {
  key: Key
  name: string
}

export const useActions = (readAt: string | null, userId: string) => {
  const { id } = useUser()

  const { editMessage } = useEditMessage()
  const { replyMessage } = useReplyMessage()
  const { deleteMessage } = useDeleteMessage()
  const { selectMessage } = useSelectMessage()

  const onAction = ({ key, text, name, id }: IActionData) => {
    switch (key) {
      case 'reply':
        replyMessage(text, name)
        break
      case 'edit':
        editMessage(text)
        break
      case 'copy':
        copyToClipboard(text)
        break
      case 'delete':
        deleteMessage(text)
        break
      case 'select':
        selectMessage(id)
    }
  }

  const actions = [
    // { key: 'reply', text: 'Ответить', Icon: BsReply },
    // { key: 'edit', text: 'Изменить', Icon: MdOutlineEdit },
    { key: 'copy', text: 'Копировать текст', Icon: FaRegCopy }
    // { key: 'pin', text: 'Закрепить', Icon: PiPushPin },
    // { key: 'forward', text: 'Переслать', Icon: TiArrowForwardOutline },
    // { key: 'select', text: 'Выделить', Icon: RiCheckboxCircleLine }
  ]

  if (id === userId) {
    actions.push({ key: 'delete', text: 'Удалить', Icon: MdOutlineDelete })
  }

  if (readAt) {
    actions.push({
      key: 'read',
      text: getReadAtText(readAt),
      Icon: IoCheckmarkDoneOutline
    })
  }

  return { onAction, actions }
}
