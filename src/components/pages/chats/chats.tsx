'use client'

import { ChatsList } from './chat-list'
import { Likes } from './likes/likes'

export const Chats = () => {
  return (
    <div className='flex flex-col gap-2 overflow-y-hidden'>
      <Likes />
      <ChatsList />
    </div>
  )
}
