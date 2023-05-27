// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatWithUser> = (args) => {
//   return <ChatWithUser {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatWithUser from './ChatWithUser'

export const generated = () => {
  return <ChatWithUser />
}

export default {
  title: 'Components/ChatWithUser',
  component: ChatWithUser,
} as ComponentMeta<typeof ChatWithUser>
