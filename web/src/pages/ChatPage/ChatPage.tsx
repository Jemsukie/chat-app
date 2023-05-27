import { MetaTags } from '@redwoodjs/web'

import ChatInboxCell from 'src/components/ChatInboxCell'

const ChatPage = () => {
  return (
    <>
      <MetaTags title="Chat" description="Chat page" />

      <div className="flex justify-center">
        <h1 className="text-xl">Chat</h1>
      </div>
      <div className="flex h-full w-full justify-center">
        <div className="flex w-full flex-col sm:w-3/4 md:w-1/2">
          <div className="h-3/4 w-full overflow-x-auto">
            <ChatInboxCell />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage
