import { gql } from 'react-apollo'

export const getLeanCoffees = gql`
  query {
    allLeanCoffees(orderBy: createdAt_DESC) {
      createdAt,
      id,
      state,
      topics { id, name },
      user { id, name }
    }
    user {
      id
      name
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
        id
        name
        votesOnThisCoffee: _votesMeta(filter:{ leanCoffee:{ id: $id } }){
          count
        }
      },
      createdAt
      state
      topics {
        id
        name
        user {
          id
          name
        }
        state
        _votesMeta {
          count
        }
      }
      votesPerUser
    }
    user {
      id
      name
    }
  }
`

export const updateLeanCoffeeState = gql`
  mutation updateLeanCoffee($id: ID!, $state: LeanCoffeeState!) {
    updateLeanCoffee(id: $id, state: $state) {
      id
      state
    }
  }
`

export const deleteLeanCoffee = gql`
  mutation deleteLeanCoffee($id: ID!) {
    deleteLeanCoffee(id: $id) {
      id
    }
  }
`

export const leanCoffeeStateSubscription = gql`
  subscription stateChangeSubscription($id: ID!) {
    LeanCoffee(filter: {
      mutation_in: [UPDATED, CREATED, DELETED],
      node: { id: $id }
    }) {
      node {
        state
      }
    }
  }
`
