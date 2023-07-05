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
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
    searchUsers(searchTerm: String!): [User!]! @requireAuth
    userPage(page: Int): UserPage @requireAuth
  }
`
