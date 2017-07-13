import React from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { Card, Dimmer, Header, Label, Icon, Loader } from 'semantic-ui-react'
import { getLeanCoffees } from '../../graphql'

const ListLeanCoffees = ({ data }) => {
  if (data.loading) return (
    <Dimmer inverted active>
      <Loader>Loading</Loader>
    </Dimmer>
  )

  if (data.error) {
    console.error('Something went wrong:' , data.error)
    return null
  }

  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='coffee' circular />
        <Header.Content>
          Lean Coffees
        </Header.Content>
      </Header>

      <Card.Group>
        { data.allLeanCoffees.map(leanCoffee =>
          <Card key={leanCoffee.id}>
            <Card.Content>
              <Label as='a' size='mini' color='orange' ribbon='right'>{leanCoffee.state}</Label>
              <Card.Header>
                { moment(leanCoffee.createdAt).format('MMMM Do YYYY') }
              </Card.Header>
              <Card.Meta>
                hosted by: {leanCoffee.host ? leanCoffee.host.name : 'N/A'}
              </Card.Meta>
              <Card.Description>
                { leanCoffee.topics.length
                  ? leanCoffee.topics.map(topic => <Label size='mini' key={topic.id}>{topic.name}</Label>)
                  : <span>There are no topics specified</span>
                }
              </Card.Description>
            </Card.Content>
          </Card>
        ) }
      </Card.Group>
    </div>
  )
}

export default graphql(getLeanCoffees)(ListLeanCoffees)
