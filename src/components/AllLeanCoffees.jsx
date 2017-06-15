import React from 'react'
import { gql, graphql } from 'react-apollo'
import moment from 'moment'
import { Dimmer, Label, List, Loader, Segment } from 'semantic-ui-react'

const AllLeanCoffees = ({ data }) => {
  if (data.loading) return (
    <Dimmer inverted active>
      <Loader>Loading</Loader>
    </Dimmer>
  )

  if (data.error)
    return console.log('ERROR:' , data.error)

  return (
    <Segment>
      <List celled>
        { data.allLeanCoffees.map(leanCoffee =>
          <List.Item key={leanCoffee.id}>
            <List.Content>
              <Label as='a' size='mini' color='orange' ribbon='right'>{leanCoffee.state}</Label>
              <List.Header>{moment(leanCoffee.createdAt).format('MMMM Do YYYY')}</List.Header>
              {leanCoffee.topics.map(topic => <Label size='mini' key={topic.id}>{topic.name}</Label>)}
            </List.Content>
          </List.Item>
        ) }
      </List>
    </Segment>
  )
}

const MyQuery = gql`
  query {
    allLeanCoffees {
      createdAt,
      id,
      state,
      topics { id, name }
    }
  }
`

export default graphql(MyQuery)(AllLeanCoffees)
