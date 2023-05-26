import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GenericTable from '../../lib/GenericTable'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      username
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps) => {
  const headers = ['name', 'actions']
  const data = users.map((u) => {
    return {
      ...u,
      actions: <button className="btn-primary btn-sm btn">Hello</button>,
    }
  })

  return (
    <>
      <ul>
        {users.map((item) => {
          return <li key={item.id}>{JSON.stringify(item)}</li>
        })}
      </ul>
      <div>
        <GenericTable headers={headers} data={data} />
      </div>
    </>
  )
}
