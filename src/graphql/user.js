import { gql } from 'react-apollo'

export const getUser = gql`
  query userQuery {
    user {
      id
      name
    }
  }
`
