import { MetaTags } from '@redwoodjs/web'

import ContactsCell from 'src/components/ContactsCell'

const UsersPage = ({ page = 1 }) => {
  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <div className="flex justify-center">
        <h1 className="text-xl">Contact List</h1>
      </div>

      <ContactsCell page={page} />
    </>
  )
}

export default UsersPage
