import { useMemo, useState } from 'react'

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

const UPDATE_CHAT_MUTATION = gql`
  mutation UpdateChatMutation($input: UpdateChatInput!) {
    updateChat(input: $input) {
      id
      message
    }
  }
`

const DELETE_CHAT_MUTATION = gql`
  mutation DeleteChatMutation($id: Int!) {
    deleteChat(id: $id) {
      id
      message
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

  const [updateChat] = useMutation(UPDATE_CHAT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Updated!`)
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Deleted!`)
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const isNotContact = useMemo(() => {
    if (!toContact) return false

    return !toContact.checkContact
  }, [toContact])

  const [isHovered, setIsHovered] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState()

  const onEdit = (id) => {
    const message = prompt('Enter the new message')

    if (!message) return

    updateChat({
      variables: {
        input: { id, message },
      },
    })
  }

  const onDelete = (id) => {
    if (confirm('Are you sure to delete this message?')) {
      deleteChat({ variables: { id } })
    }
  }

  const handleMouseEnter = (id) => {
    setHoveredMessage(id)
    setIsHovered(true)
    // Perform any actions or call any functions you want when hovering starts
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Perform any actions or call any functions you want when hovering ends
  }

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
          onMouseEnter={() => {
            if (c.remark === 'Sent') {
              handleMouseEnter(idx)
            }
          }}
          onMouseLeave={() => {
            if (c.remark === 'Sent') {
              handleMouseLeave()
            }
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          {c.message}
          {isHovered && hoveredMessage === idx && (
            <div>
              <button
                className="badge-info badge"
                onClick={() => {
                  onEdit(c.id)
                }}
              >
                Edit
              </button>
              <button
                className="badge-error badge"
                onClick={() => {
                  onDelete(c.id)
                }}
              >
                Delete
              </button>
            </div>
          )}
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
