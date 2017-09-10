import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Label, List, Segment, Item } from 'semantic-ui-react'
import { compose, graphql } from 'react-apollo'
import moment from 'moment'
import ChangeStateForm from '../ChangeStateForm'
import TopicList from './TopicList/TopicList'
import { deleteLeanCoffee, getLeanCoffee, getLeanCoffees } from '../../../graphql'

class LeanCoffeeDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changeStateOpen: false,
    }
  }

  handleChangeStateOpen = () => {
    this.setState({
      changeStateOpen: true
    })
  }

  handleChangeStateClose = () => {
    this.setState({
      changeStateOpen: false
    })
  }

  handleDelete = () => {
    const { data: { LeanCoffee }, deleteLeanCoffee, history } = this.props

    deleteLeanCoffee(LeanCoffee.id).then(() => {
      history.push('/coffees')
    })
  }

  render() {
    const { data: { LeanCoffee, loading, user } } = this.props
    const { changeStateOpen } = this.state
    const coffeeStateName = LeanCoffee && LEAN_COFFEE_STATE_NAMES[LeanCoffee.state]
    const coffeeStateColor = LeanCoffee && LEAN_COFFEE_STATE_COLORS[LeanCoffee.state]

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Coffee details
          </Header.Content>
          <Header.Subheader>
            { LeanCoffee && moment(LeanCoffee.createdAt).format('MMMM Do YYYY') }
          </Header.Subheader>
        </Header>

        <Segment loading={loading}>
          <Item.Group>
            { LeanCoffee &&
              <Item>
                <Item.Content>
                  <Item.Meta>
                    <List horizontal divided>
                      <List.Item>
                        { user.id === LeanCoffee.user.id
                          ? <Label
                              as='a'
                              color={coffeeStateColor}
                              onClick={this.handleChangeStateOpen}
                            >
                              <Icon name='edit'/> {coffeeStateName}
                            </Label>
                          : <Label color={coffeeStateColor}>
                              {coffeeStateName}
                            </Label>
                        }

                      </List.Item>
                      <List.Item>hosted by: {LeanCoffee.user ? LeanCoffee.user.name : 'N/A'}</List.Item>
                    </List>
                  </Item.Meta>

                  <Item.Description>

                    {
                      user.id === LeanCoffee.user.id && changeStateOpen
                      && <ChangeStateForm
                          hideForm={this.handleChangeStateClose}
                          id={LeanCoffee.id}
                          state={LeanCoffee.state}
                        />
                    }

                    <Header size='medium'>Topics</Header>

                    <TopicList
                      coffeeState={LeanCoffee.state}
                      leanCoffeeId={LeanCoffee.id}
                      leanCoffeeUserId={LeanCoffee.user.id}
                      loading={loading}
                      topics={LeanCoffee.topics}
                      userId={user.id}
                    />

                  </Item.Description>
                  {
                    user.id === LeanCoffee.user.id
                    && <Item.Extra>
                         <Button floated='right' negative onClick={this.handleDelete}>Delete</Button>
                       </Item.Extra>
                  }
                </Item.Content>
              </Item>
            }

          </Item.Group>
        </Segment>
      </div>
    )
  }
}

LeanCoffeeDetails.propTypes = {
  data: PropTypes.object.isRequired,
  deleteLeanCoffee: PropTypes.func.isRequired,
}

export const getTopicColor = (topicState) => {
  switch (topicState) {
    case 'CURRENT':
      return 'green'
    case 'OPEN':
      return 'blue'
    case 'CLOSED':
      return 'orange'
    default:
      return 'grey'
  }
}

export const TOPIC_ICONS = {
  OPEN: 'square outline',
  CURRENT: 'pointing right',
  CLOSED: 'checkmark box',
}

const LEAN_COFFEE_STATE_COLORS = {
  'TOPIC_VOTING': 'pink',
  'TOPIC_COLLECTION': 'purple',
  'DISCUSSION': 'violet',
}

const LEAN_COFFEE_STATE_NAMES = {
  'TOPIC_VOTING': 'Topic voting',
  'TOPIC_COLLECTION': 'Topic collection',
  'DISCUSSION': 'Discussion',
}

export default compose(
  graphql(getLeanCoffee, {
    options: ({ match: { params: { id } } }) => ({
      fetchPolicy: 'network-only',
      variables: { id },
    })
  }),
  graphql(deleteLeanCoffee, {
    props: ({ mutate }) => ({
      deleteLeanCoffee: (id) => mutate({
        refetchQueries: [
          { query: getLeanCoffees }
        ],
        variables: { id }
      })
    })
  })
)(LeanCoffeeDetails)
