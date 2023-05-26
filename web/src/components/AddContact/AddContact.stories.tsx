// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof AddContact> = (args) => {
//   return <AddContact {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import AddContact from './AddContact'

export const generated = () => {
  return <AddContact />
}

export default {
  title: 'Components/AddContact',
  component: AddContact,
} as ComponentMeta<typeof AddContact>
