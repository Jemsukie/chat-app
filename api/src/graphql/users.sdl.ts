export const schema = gql`
  type User {
    id: String!
    username: String
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
  }

  input CreateUserInput {
    username: String!
  }

  input UpdateUserInput {
    username: String
    password: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @skipAuth
    deleteUser(id: String!): User! @skipAuth
  }
`
