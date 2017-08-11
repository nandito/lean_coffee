import { gql } from 'react-apollo'

export const getLeanCoffees = gql`
  query {
    allLeanCoffees(orderBy: createdAt_DESC) {
      createdAt,
      id,
      state,
      topics { id, name },
      user { name }
    }
  }
`

export const createLeanCoffee = gql`
  mutation createLeanCoffee($userId: ID!, $state: LeanCoffeeState!) {
    createLeanCoffee(userId: $userId, state: $state) {
      id
    }
  }
`

export const getLeanCoffee = gql`
  query LeanCoffee($id: ID!) {
    LeanCoffee(id: $id) {
      id
      user {
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

// TODO: update the state type to LeanCoffeeState
export const updateLeanCoffeeState = gql`
  mutation updateLeanCoffee($id: ID!, $state: LEAN_COFFEE_STATE!) {
    updateLeanCoffee(id: $id, state: $state) {
      id
      state
    }
  }
`
