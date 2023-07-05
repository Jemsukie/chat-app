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
    contacts: [Contact!]! @requireAuth
    contactPage(page: Int): ContactPage @requireAuth
    searchContacts(searchTerm: String!): [User!]! @requireAuth
    checkContact(id: Int!): Boolean! @requireAuth
  }

  type Mutation {
    createContact(id: Int!): Contact! @requireAuth
    deleteContact(id: Int!): Contact @requireAuth
  }
`
