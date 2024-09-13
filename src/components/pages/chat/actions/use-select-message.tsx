import { useChat } from '../chat-provider'

export const useSelectMessage = () => {
  const { action, setAction } = useChat()

  const selectMessage = (id: string) => {
    const ids: string[] = action?.select ?? []
    ids.push(id)
    setAction({ select: ids })
  }

  const unSelectMessage = (id: string) => {
    const ids: string[] = action?.select ?? []
    const filteredIds = ids.filter((i) => i !== id)
    setAction({ select: filteredIds })
  }

  return { unSelectMessage, selectMessage }
}
