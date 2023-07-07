import { useState } from 'react'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GenericTable from 'src/lib/GenericTable'

import ChatUtils from '../ChatUtils/ChatUtils'

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

export const Success = ({ contactPage, queryResult }: CellSuccessProps) => {
  const { refetch } = queryResult
  const { contacts } = contactPage

  const [userIds, setUserIds] = useState([])
  const addRecipient = (idx) => setUserIds((prev) => [...prev, idx])
  const removeRecipient = (idx) =>
    setUserIds((prev) => [...prev.filter((p) => p !== idx)])

  const headers = ['name', 'actions']
  const data = contacts.map((u) => {
    const { user } = u
    const isIdIncluded = userIds.includes(user.id)
    const includeId = () =>
      isIdIncluded ? removeRecipient(user.id) : addRecipient(user.id)
    const color = isIdIncluded ? 'btn-error' : 'btn-success'

    return {
      ...user,
      actions: (
        <button className={`${color}  btn-sm btn`} onClick={includeId}>
          {isIdIncluded ? '-' : '+'}
        </button>
      ),
    }
  })
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="w-full sm:w-3/4 md:w-1/2">
          <div className="h-[65vh] overflow-x-auto rounded-lg bg-primary-content p-5">
            <GenericTable data={data} headers={headers} />
          </div>
          <ChatUtils userIds={userIds} refresh={refetch} />
        </div>
      </div>
    </>
  )
}
