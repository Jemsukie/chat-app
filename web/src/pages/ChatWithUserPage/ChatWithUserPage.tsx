import { MetaTags } from '@redwoodjs/web'

import ChatsCell from 'src/components/ChatsCell'
const ChatWithUserPage = ({ userId }) => {
  return (
    <>
      <MetaTags title="ChatWithUser" description="ChatWithUser page" />

      <div className="flex justify-center">
        <h1 className="text-xl">Chat with User</h1>
      </div>
      <div className="flex h-full w-full justify-center">
        <div className="flex w-full flex-col sm:w-3/4 md:w-1/2">
          <div className="h-screen w-full">
            <ChatsCell userId={userId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatWithUserPage
