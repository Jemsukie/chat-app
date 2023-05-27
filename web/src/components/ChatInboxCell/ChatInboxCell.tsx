import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GenericTable from 'src/lib/GenericTable'

export const QUERY = gql`
  query ChatInboxQuery {
    chatInbox {
      id
      userId
      name
      message
      remark
      date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ chatInbox }: CellSuccessProps) => {
  // We don't wanna over populate the column with long string
  const shortenString = (str, maxLength = 40) => {
    return str.length <= maxLength
      ? str
      : str.substring(0, maxLength - 3) + '...'
  }

  // Let's create custom headers here
  const headers = ['name', 'message', 'actions']
  const data = chatInbox.map((c) => {
    return {
      ...c,
      message: (
        <>
          {shortenString(c.message)}
          {c.remark === 'Sent' && <div className="badge badge-info">You</div>}
        </>
      ),
      actions: (
        <button
          className="btn-primary btn"
          onClick={() => {
            navigate(routes.chatWithUser({ userId: c.userId }))
          }}
        >
          View
        </button>
      ),
    }
  })

  return (
    <>
      <div className="bg-primary-content  p-5">
        <GenericTable data={data} headers={headers} />
      </div>
    </>
  )
}
