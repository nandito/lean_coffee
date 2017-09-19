import * as React from 'react'
import { graphql } from 'react-apollo'
import * as moment from 'moment'
import { Card, Dimmer, Header, Label, Icon, Loader, Segment } from 'semantic-ui-react'
import CreateLeanCoffee from './Create'
import { COFFEE_STATE_NAMES, COFFEE_STATE_COLORS } from '../constants'
import { getLeanCoffees } from '../../../graphql'

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

      <Segment>
        <CreateLeanCoffee />
      </Segment>

      <Card.Group itemsPerRow={3} stackable>
        { data.allLeanCoffees.map((leanCoffee, index) =>
          <Card key={leanCoffee.id} href={`coffees/${leanCoffee.id}`} raised={index === 0}>
            <Card.Content>
              { index === 0 && <Label color='red' corner='left' icon='birthday' /> }

              <Label size='small' color={COFFEE_STATE_COLORS[leanCoffee.state]} ribbon='right'>
                {COFFEE_STATE_NAMES[leanCoffee.state]}
              </Label>

              <Card.Header>
                { moment(leanCoffee.createdAt).format('MMMM Do YYYY') }
              </Card.Header>
              <Card.Meta>
                hosted by: {leanCoffee.user ? leanCoffee.user.name : 'N/A'}
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

// ListLeanCoffees.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default graphql(getLeanCoffees, { options: {fetchPolicy: 'network-only'}})(ListLeanCoffees)
