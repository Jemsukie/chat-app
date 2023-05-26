import { MetaTags } from '@redwoodjs/web'

import AddContact from 'src/components/AddContact/AddContact'

const AddContactPage = () => {
  return (
    <>
      <MetaTags title="AddContact" description="AddContact page" />

      <div className="flex justify-center">
        <h1 className="text-xl">Add Contact</h1>
      </div>

      <AddContact />
    </>
  )
}

export default AddContactPage
