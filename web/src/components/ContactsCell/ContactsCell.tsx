import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Pagination from 'src/lib/Pagination'

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page } }
}

export const QUERY = gql`
  query ContactPageQuery($page: Int) {
    contactPage(page: $page) {
      contacts {
        id
        user {
          id
          name
          username
        }
      }
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ contactPage }: CellSuccessProps) => {
  const { contacts, count } = contactPage

  const headers = ['name', 'actions']
  const data = contacts.map((u) => {
    return {
      ...u.user,
      actions: (
        <>
          <button className="btn-primary btn-sm btn">Chat</button>
          <button className="btn-error btn-sm btn">Remove</button>
        </>
      ),
    }
  })

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-1/2">
          <div className="flex justify-end">
            <button
              className="btn-success btn"
              onClick={() => {
                navigate(routes.addContact())
              }}
            >
              Add Contact
            </button>
          </div>

          <Pagination
            headers={headers}
            data={data}
            count={count}
            link={'users'}
          />
        </div>
      </div>
    </>
  )
}
