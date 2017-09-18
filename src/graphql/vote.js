import { gql } from 'react-apollo'

export const createVote = gql`
  mutation createVote($leanCoffeeId: ID!, $userId: ID!, $topicId: ID!) {
    createVote(leanCoffeeId:$leanCoffeeId, userId:$userId, topicId:$topicId) {
      id
    }
  }
`

export const votesOfLeanCoffeeSubscription = gql`
  subscription votesOfLeanCoffeeSubscription($id: ID!) {
    Vote(filter: { node: { leanCoffee: { id:$id } } }) {
      node {
        topic {
          id
          _votesMeta {
            count
          }
        }
      }
    }
  }
`
