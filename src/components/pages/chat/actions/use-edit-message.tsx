import { useChat } from '../chat-provider'

export const useEditMessage = () => {
  const { setAction } = useChat()

  const editMessage = (text: string) => {
    setAction({ copy: { text } })
  }

  return { editMessage }
}
