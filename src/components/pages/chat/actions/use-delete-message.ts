import { useChat } from '../chat-provider'

export const useDeleteMessage = () => {
  const { setAction } = useChat()

  const deleteMessage = (text: string) => {
    setAction({ delete: { text } })
  }

  return { deleteMessage }
}
