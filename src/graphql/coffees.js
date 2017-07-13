import { gql } from 'react-apollo'

export const getLeanCoffees = gql`
  query {
    allLeanCoffees {
      createdAt,
      id,
      state,
      topics { id, name },
      host { name }
    }
  }
`

export const createLeanCoffee = gql`
  mutation createLeanCoffee($hostId: ID!, $state: LEAN_COFFEE_STATE!) {
    createLeanCoffee(hostId: $hostId, state: $state) {
      id
    }
  }
`

export const getLeanCoffee = gql`
  query LeanCoffee($id: ID!) {
    LeanCoffee(id: $id) {
      host {
        name
      },
      createdAt
      state
      topics {
        id
        name
        state
        _votesMeta {
          count
        }
      }
    }
  }
`
