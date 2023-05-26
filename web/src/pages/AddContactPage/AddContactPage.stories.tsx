import type { ComponentMeta } from '@storybook/react'

import AddContactPage from './AddContactPage'

export const generated = () => {
  return <AddContactPage />
}

export default {
  title: 'Pages/AddContactPage',
  component: AddContactPage,
} as ComponentMeta<typeof AddContactPage>
