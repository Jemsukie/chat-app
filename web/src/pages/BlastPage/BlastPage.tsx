import { MetaTags } from '@redwoodjs/web'

import ChatManyCell from 'src/components/ChatManyCell'

const BlastPage = () => {
  return (
    <>
      <MetaTags title="Blast" description="Blast page" />

      <ChatManyCell />
    </>
  )
}

export default BlastPage
