import { Form, Submit, TextAreaField, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_CHAT_MUTATION = gql`
  mutation CreateChatMutation($input: CreateChatInput!) {
    createChat(input: $input) {
      id
      message
    }
  }
`

const ChatUtils = ({ refresh, userId }) => {
  const formMethods = useForm()

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
        <Modal />
        <Submit className="btn-primary btn">Send</Submit>
      </Form>
    </>
  )
}

const Modal = () => {
  return (
    <>
      <label htmlFor="modal-component" className="btn-success btn">
        Quick Message
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="modal-component" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            {`You've been selected for a chance to get one year of
        subscription to use Wikipedia for free!`}
          </p>
          <div className="modal-action">
            <label htmlFor="modal-component" className="btn-success btn">
              Yay!
            </label>
            <label htmlFor="modal-component" className="btn-success btn">
              Wews!
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatUtils
