import { gql } from 'react-apollo'

export const getParticipants = gql`
  query getParticipants {
    allParticipants {
      id,
      name,
    }
  }
`

export const createParticipant = gql`
  mutation createParticipant($name: String!) {
    createParticipant(name: $name) {
      id,
      name
    }
  }
`

export const deleteParticipant = gql`
  mutation deleteParticipant($id: ID!) {
    deleteParticipant(id: $id) {
      id
    }
  }
`
