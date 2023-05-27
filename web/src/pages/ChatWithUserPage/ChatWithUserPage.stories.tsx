import type { ComponentMeta } from '@storybook/react'

import ChatWithUserPage from './ChatWithUserPage'

export const generated = () => {
  return <ChatWithUserPage userId={1} />
}

export default {
  title: 'Pages/ChatWithUserPage',
  component: ChatWithUserPage,
} as ComponentMeta<typeof ChatWithUserPage>
