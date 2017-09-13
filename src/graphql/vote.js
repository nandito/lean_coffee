import { gql } from 'react-apollo'

export const createVote = gql`
  mutation createVote($leanCoffeeId: ID!, $userId: ID!, $topicId: ID!) {
    createVote(leanCoffeeId:$leanCoffeeId, userId:$userId, topicId:$topicId) {
      id
    }
  }
`
