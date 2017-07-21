import { gql } from 'react-apollo'

export const getTopics = gql`
  query {
    allTopics {
      id
      name
      state
      leanCoffee {
        createdAt
      }
      updatedAt
      _votesMeta {
        count
      }
    }
  }
`

export const createTopic = gql`
  mutation createTopic($name: String!, $state: TOPIC_STATE!, $leanCoffeeId: ID) {
    createTopic(name: $name, state: $state, leanCoffeeId: $leanCoffeeId){
      id
    }
  }
`
