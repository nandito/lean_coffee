import gql from 'graphql-tag'

export const getUser = gql`
  query getUser {
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
