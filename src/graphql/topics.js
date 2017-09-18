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

export const updateTopicState = gql`
  mutation updateTopic($id: ID!, $state: TopicState!) {
    updateTopic(id: $id, state: $state) {
      id
    }
  }
`

export const getTopicsOfLeanCoffee = gql`
  query topicsOfCoffee($id:ID!){
    allTopics(filter:{ leanCoffee: { id:$id } }){
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
  }
`

export const topicsOfLeanCoffeeSubscription = gql`
  subscription topicsOfLeanCoffeeSubscription($id: ID!) {
    Topic(filter: { node: { leanCoffee: { id:$id } } }) {
      node {
        id
        name
        state
        user {
          name
          id
        }
        _votesMeta {
          count
        }
      }
      previousValues {
        id
      }
    }
  }
`
