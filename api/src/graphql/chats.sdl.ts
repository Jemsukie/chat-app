export const schema = gql`
  type Chat {
    id: Int!
    message: String!
    sender: User
    receiver: User
    date: DateTime
  }

  type ChatsByUser {
    id: Int!
    message: String!
    remark: String!
    date: DateTime!
  }

  type ChatInbox {
    id: Int!
    userId: Int!
    name: String!
    message: String!
    remark: String!
    date: DateTime!
  }

  type ChatPage {
    contacts: [Chat]!
    count: Int!
  }

  input CreateChatInput {
    userId: Int!
    message: String!
  }

  input UpdateChatInput {
    id: Int!
    message: String!
  }

  type Query {
    chatsByUser(userId: Int!): [ChatsByUser]! @requireAuth
    chatInbox: [ChatInbox]! @requireAuth
  }

  type Mutation {
    createChat(input: CreateChatInput!): Chat! @requireAuth
    updateChat(input: UpdateChatInput!): Chat! @requireAuth
    deleteChat(id: Int!): Chat! @requireAuth
  }
`
