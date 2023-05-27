import { useMemo } from 'react'

import { useMutation } from '@apollo/client'

import { CellSuccessProps, CellFailureProps, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Chats from '../ChatUtils/ChatUtils'

export const beforeQuery = ({ userId }) => {
  userId = userId ? parseInt(userId, 10) : 1

  return { variables: { userId } }
}

export const QUERY = gql`
  query ChatsByUserQuery($userId: Int!) {
    chatsByUser(userId: $userId) {
      id
      message
      remark
      date
    }
  }
`

const CHECK_CONTACT = gql`
  query CheckContactQuery($id: Int!) {
    checkContact(id: $id)
  }
`

const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContactMutation($id: Int!) {
    createContact(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  chatsByUser,
  userId,
  queryResult,
}: CellSuccessProps) => {
  const { refetch } = queryResult

  const { data, refetch: contacted } = useQuery(CHECK_CONTACT, {
    onCompleted: ({ searchContacts }) => {
      if (searchContacts.length > 0) {
        toast.success('User found!')
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
    variables: { id: parseInt(userId) },
  })

  // Mutation for adding a user as a contact
  const [createContact] = useMutation(CREATE_CONTACT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Added!`)
      contacted()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const isNotContact = useMemo(() => {
    if (!data) return false

    return !data.checkContact
  }, [data])

  const chatBox = chatsByUser.map((c, idx) => {
    return (
      <div
        className={`chat chat-${c.remark === 'Sent' ? 'end' : 'start'}`}
        key={idx}
      >
        <div
          className={`chat-bubble chat-bubble-${
            c.remark === 'Sent' ? 'primary' : 'success'
          }`}
        >
          {c.message}
        </div>
      </div>
    )
  })

  return (
    <>
      {isNotContact && (
        <button
          className="badge-primary badge"
          onClick={() => {
            if (confirm('Add this to contact?')) {
              createContact({ variables: { id: parseInt(userId) } })
            }
          }}
        >
          Add to Contact?
        </button>
      )}

      <div className="h-3/5 overflow-x-auto rounded-lg bg-primary-content p-5">
        {chatBox}
      </div>

      <Chats refresh={refetch} userId={userId} />
    </>
  )
}
