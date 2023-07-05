import { useMemo, useState } from 'react'

import { Form, Submit, TextAreaField, useForm } from '@redwoodjs/forms'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GenericTable from 'src/lib/GenericTable'

const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($input: CreateChatInput!) {
    createChat(input: $input) {
      id
      message
    }
  }
`

const COMPOSERS_QUERY = gql`
  query ComposersQuery {
    composers {
      id
      message
    }
  }
`

const ChatUtils = ({ refresh, userIds }) => {
  const formMethods = useForm()
  const { setValue } = formMethods
  const noRecipient = userIds.length === 0
  const [loading, setLoading] = useState(false)

  const [createChat] = useMutation(CREATE_CHAT_MUTATION, {
    onCompleted: async () => {
      toast.success(`Successfully Sent!`)
      refresh()
      formMethods.reset()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSendMessage = async (data) => {
    const { message } = data
    setLoading(true)

    await Promise.all(
      userIds.map((u) =>
        createChat({
          variables: {
            input: {
              userId: parseInt(u),
              message,
            },
          },
        })
      )
    ).finally(() => setLoading(false))
  }

  return (
    <>
      <Form onSubmit={onSendMessage} formMethods={formMethods}>
        <TextAreaField
          name="message"
          className="textarea-primary textarea w-full"
          errorClassName="textarea-primary textarea w-full border border-error"
          validation={{ required: true }}
          placeholder="Enter Message"
          readOnly={noRecipient || loading}
        />
        <Modal setValue={setValue} />
        <Submit className="btn-primary btn" disabled={noRecipient || loading}>
          Send
        </Submit>
      </Form>
    </>
  )
}

const Modal = ({ setValue }) => {
  const { data: messages } = useQuery(COMPOSERS_QUERY)

  const quickMessages = useMemo(() => {
    if (!messages) return []

    return messages.composers
  }, [messages])

  const headers = ['message', 'actions']

  const data = quickMessages.map((q) => {
    return {
      ...q,
      actions: (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <label
          {...{
            className: 'btn-success btn',
            htmlFor: 'modal-component',
            onClick: () => {
              setValue('message', q.message)
            },
          }}
        >
          Copy
        </label>
      ),
    }
  })

  return (
    <>
      <label htmlFor="modal-component" className="btn-success btn">
        Quick Message
      </label>
      {/* Header */}
      <input type="checkbox" id="modal-component" className="modal-toggle" />
      <label
        htmlFor="modal-component"
        className="modal modal-bottom sm:modal-middle"
      >
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Pick a message</h3>

          {/* This will be the body */}
          <div className="overflow-x-auto">
            <GenericTable headers={headers} data={data} />
          </div>
        </label>
      </label>
    </>
  )
}

export default ChatUtils
