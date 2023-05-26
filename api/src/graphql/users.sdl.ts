export const schema = gql`
  type User {
    id: String!
    name: String!
    username: String!
  }

  type UserPage {
    users: [User!]!
    count: Int!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
    searchUsers(searchTerm: String!): [User!]! @skipAuth
    userPage(page: Int): UserPage @skipAuth
  }
`
