export const schema = gql`
  type User {
    id: String!
    username: String!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
  }
`
