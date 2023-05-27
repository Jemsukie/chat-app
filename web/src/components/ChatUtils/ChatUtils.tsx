import { useMemo } from 'react'

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

const ChatUtils = ({ refresh, userId }) => {
  const formMethods = useForm()
  const { setValue } = formMethods

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

  const onSendMessage = (data) => {
    const { message } = data

    createChat({
      variables: {
        input: {
          userId: parseInt(userId),
          message,
        },
      },
    })
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
        />
        <Modal setValue={setValue} />
        <Submit className="btn-primary btn">Send</Submit>
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
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="modal-component" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Pick a message</h3>
          {/* <p className="py-4">
            {`You've been selected for a chance to get one year of
        subscription to use Wikipedia for free!`}
          </p> */}

          <div className="overflow-x-auto">
            <GenericTable headers={headers} data={data} />
          </div>

          {/* <div className="modal-action">
            <label htmlFor="modal-component" className="btn-success btn">
              Yay!
            </label>
            <label htmlFor="modal-component" className="btn-success btn">
              Wews!
            </label>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ChatUtils
