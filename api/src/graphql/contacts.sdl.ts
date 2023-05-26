export const schema = gql`
  type Contact {
    id: Int!
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

  type Mutation {
    createContact(id: Int!): Contact! @skipAuth
    deleteContact(id: Int!): Contact @skipAuth
  }
`
