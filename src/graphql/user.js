import { gql } from 'react-apollo'

export const getUser = gql`
  query userQuery {
    user {
      id
      name
    }
  }
`

export const createUser = gql`
  mutation createUser($idToken: String!, $name: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name) {
      id
    }
  }
`
