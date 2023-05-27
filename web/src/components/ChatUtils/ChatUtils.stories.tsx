// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Chats> = (args) => {
//   return <Chats {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Chats from './ChatUtils'

export const generated = () => {
  return <Chats refresh={() => {}} userId={1} />
}

export default {
  title: 'Components/Chats',
  component: Chats,
} as ComponentMeta<typeof Chats>
