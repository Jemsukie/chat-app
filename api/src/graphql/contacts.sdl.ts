export const schema = gql`
  type Contact {
    id: String!
    owner: User
    user: User
  }

  type ContactPage {
    contacts: [Contact]!
    count: Int!
  }

  type Query {
    contacts: [Contact!]! @skipAuth
    contactPage(page: Int): ContactPage @skipAuth
    searchContacts(searchTerm: String!): [User!]! @skipAuth
  }
`
