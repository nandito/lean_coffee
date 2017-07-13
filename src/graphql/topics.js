import { gql } from 'react-apollo'

export const createTopic = gql`
  mutation createTopic {
    createTopic($name: String!, $state: TOPIC_STATE!, $leanCoffeeId: ID!){
      id
    }
  }
`
