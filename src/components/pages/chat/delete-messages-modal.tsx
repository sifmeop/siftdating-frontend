import { Checkbox } from '@nextui-org/checkbox'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/modal'
import { useDeleteMessages } from '~/api/messages'
import { MyButton } from '~/ui/my-button'

interface IProps {
  children: (onOpen: () => void) => React.ReactNode
  name: string
  chatId: string
  messagesId: string
}

export const DeleteMessagesModal = ({
  messagesId,
  chatId,
  name,
  children
}: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { onDelete } = useDeleteMessages()

  const onPress = () => {
    onDelete({ chatId, messagesIds: [messagesId] })
  }

  return (
    <>
      {children(onOpen)}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Удалить это сообщение?
              </ModalHeader>
              <ModalBody>
                <Checkbox defaultSelected>Также удалить для {name}</Checkbox>
              </ModalBody>
              <ModalFooter>
                <MyButton variant='light' onPress={onClose}>
                  Отмена
                </MyButton>
                <MyButton variant='light' onPress={onPress}>
                  Удалить
                </MyButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
