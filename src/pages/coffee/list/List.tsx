import * as React from 'react'
import { ChildProps, graphql } from 'react-apollo'
import * as moment from 'moment'
import { Card, Header, Icon, Label, Segment } from 'semantic-ui-react'
import { Loading } from '../../../components'
import CreateLeanCoffee from './Create'
import { COFFEE_STATE_NAMES, COFFEE_STATE_COLORS } from '../constants'
import { getLeanCoffees } from '../../../graphql'
import { getLeanCoffeesQuery } from '../../../schema'

export interface Props {
  data: {
    loading: boolean;
    error: string;
    allLeanCoffees: getLeanCoffeesQuery['allLeanCoffees'];
  };
}

const ListLeanCoffees = ({data: {loading, error, allLeanCoffees}}: ChildProps<Props, getLeanCoffeesQuery>) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error('Something went wrong:' , error)
    return null
  }

  return (
    <div>
      <Header as='h2' icon={true} textAlign='center'>
        <Icon name='coffee' circular={true} />
        <Header.Content>
          Lean Coffees
        </Header.Content>
      </Header>

      <Segment>
        <CreateLeanCoffee />
      </Segment>

      <Card.Group itemsPerRow={3} stackable={true}>
        { allLeanCoffees.map((leanCoffee, index) =>
          <Card key={leanCoffee.id} href={`coffees/${leanCoffee.id}`} raised={index === 0}>
            <Card.Content>
              {index === 0 && <Label color='red' corner='left' icon='birthday' />}

              <Label size='small' color={COFFEE_STATE_COLORS[leanCoffee.state]} ribbon='right'>
                {COFFEE_STATE_NAMES[leanCoffee.state]}
              </Label>

              <Card.Header>
                {moment(leanCoffee.createdAt).format('MMMM Do YYYY')}
              </Card.Header>
              <Card.Meta>
                hosted by: {leanCoffee.user ? leanCoffee.user.name : 'N/A'}
              </Card.Meta>
              <Card.Description>
                { leanCoffee.topics && leanCoffee.topics.length
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

export default graphql<getLeanCoffeesQuery>(getLeanCoffees, {
  options: { fetchPolicy: 'network-only' }
})(ListLeanCoffees)
