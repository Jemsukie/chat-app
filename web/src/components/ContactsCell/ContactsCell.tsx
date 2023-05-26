import { navigate, routes } from '@redwoodjs/router'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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

const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContactMutation($id: Int!) {
    deleteContact(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ contactPage, queryResult }: CellSuccessProps) => {
  const { refetch } = queryResult
  const { contacts, count } = contactPage

  const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Deleted!`)
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteContact = ({ id, name }) => {
    if (confirm(`Remove ${name} from contacts?`)) {
      deleteContact({
        variables: { id: parseInt(id) },
      })
    }
  }

  const headers = ['name', 'actions']
  const data = contacts.map((u) => {
    const { user } = u
    return {
      ...user,
      actions: (
        <>
          <button className="btn-primary btn-sm btn">Chat</button>
          <button
            className="btn-error btn-sm btn"
            onClick={() => {
              onDeleteContact({ id: u.id, name: user.name })
            }}
          >
            Remove
          </button>
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
