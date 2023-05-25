import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell'

const UsersPage = () => {
  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <h1>UsersPage</h1>
      <p>
        Find me in <code>./web/src/pages/UsersPage/UsersPage.tsx</code>
      </p>
      <p>
        <UsersCell />
      </p>
    </>
  )
}

export default UsersPage
