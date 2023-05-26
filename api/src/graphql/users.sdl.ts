export const schema = gql`
  type User {
    id: String!
    name: String!
    username: String!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
    searchUsers(searchTerm: String!): [User!]! @skipAuth
  }
`
