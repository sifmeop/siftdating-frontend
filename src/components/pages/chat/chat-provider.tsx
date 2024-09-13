import { createContext, useContext, useState } from 'react'

export type TActionKey =
  | 'reply'
  | 'edit'
  | 'copy'
  | 'pin'
  | 'forward'
  | 'delete'
  | 'select'

type TAction = Partial<Record<TActionKey, any>>

interface IContext {
  action: TAction | null
  setAction: React.Dispatch<React.SetStateAction<TAction | null>>
}

const ChatContext = createContext<IContext | null>(null)

export const ChatProvider = ({ children }: React.PropsWithChildren) => {
  const [action, setAction] = useState<TAction | null>(null)

  const value: IContext = {
    action,
    setAction
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }

  return context
}
