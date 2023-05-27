export const schema = gql`
  type Composer {
    id: Int!
    message: String!
  }

  type Query {
    composers: [Composer!]! @skipAuth
  }
`
