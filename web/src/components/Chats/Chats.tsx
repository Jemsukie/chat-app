import { useMemo } from 'react'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import ChatUtils from '../ChatUtils/ChatUtils'

const CHATS_BY_USER_QUERY = gql`
  query ChatsByUserQuery($userId: Int!) {
    chatsByUser(userId: $userId) {
      id
      message
      remark
      date
    }
  }
`

const CHECK_CONTACT_QUERY = gql`
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

const Chats = ({ userId }) => {
  const { data, refetch } = useQuery(CHATS_BY_USER_QUERY, {
    variables: { userId: parseInt(userId) },
  })
  const chatsByUser = useMemo(() => {
    if (!data) return []

    return data.chatsByUser
  }, [data])

  const { data: toContact, refetch: contacted } = useQuery(
    CHECK_CONTACT_QUERY,
    {
      onCompleted: ({ searchContacts }) => {
        if (searchContacts.length > 0) {
          toast.success('User found!')
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
      variables: { id: parseInt(userId) },
    }
  )

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
    if (!toContact) return false

    return !toContact.checkContact
  }, [toContact])

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

      <ChatUtils refresh={refetch} userId={userId} />
    </>
  )
}

export default Chats
