import { useChat } from '../chat-provider'

export const useReplyMessage = () => {
  const { setAction } = useChat()

  const replyMessage = (text: string, name: string) => {
    setAction({ reply: { text, name } })
  }

  return { replyMessage }
}
