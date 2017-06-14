import React from 'react'
import { gql, graphql } from 'react-apollo'
import { List } from 'semantic-ui-react'

const AllLeanCoffees = ({ data }) => {
  if (data.loading) return null

  if (data.error)
    return console.log('ERROR:' , data.error)

  return (
    <List celled>
      { data.allLeanCoffees.map(leanCoffee =>
        <List.Item key={leanCoffee.id}>
          <List.Content>
            <List.Header>{leanCoffee.createdAt}</List.Header>
            topics: {leanCoffee.topics.map(topic => <span key={topic.id}>{topic.name}, </span>)}
          </List.Content>
        </List.Item>
      ) }
    </List>
  )
}

const MyQuery = gql`
  query {
    allLeanCoffees {
      createdAt,
      host { id, name },
      id,
      state,
      topics { id, name }
    }
  }
`

export default graphql(MyQuery)(AllLeanCoffees)
