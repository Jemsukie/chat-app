import type { ComponentMeta } from '@storybook/react'

import BlastPage from './BlastPage'

export const generated = () => {
  return <BlastPage />
}

export default {
  title: 'Pages/BlastPage',
  component: BlastPage,
} as ComponentMeta<typeof BlastPage>
