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
  mutation createTopic($name: String!, $state: TopicState!, $leanCoffeeId: ID, $userId: ID) {
    createTopic(name: $name, state: $state, leanCoffeeId: $leanCoffeeId, userId: $userId){
      id
    }
  }
`

export const deleteTopic = gql`
  mutation deleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
    }
  }
`
