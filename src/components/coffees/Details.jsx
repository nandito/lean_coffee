import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Label, List, Segment, Item } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import ChangeStateForm from './ChangeStateForm'
import { getLeanCoffee } from '../../graphql'

class LeanCoffeeDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changeStateOpen: false
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

  render() {
    const { data: { LeanCoffee, loading } } = this.props
    const { changeStateOpen } = this.state
    const coffeeStateName =LeanCoffee && LEAN_COFFEE_STATE_NAMES[LeanCoffee.state]
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
                        <Label
                          as='a'
                          color={coffeeStateColor}
                          onClick={this.handleChangeStateOpen}
                        >
                          <Icon name='edit'/> {coffeeStateName}
                        </Label>
                      </List.Item>
                      <List.Item>hosted by: {LeanCoffee.host ? LeanCoffee.host.name : 'N/A'}</List.Item>
                    </List>
                  </Item.Meta>

                  <Item.Description>

                    {
                      changeStateOpen
                      && <ChangeStateForm
                          hideForm={this.handleChangeStateClose}
                          id={LeanCoffee.id}
                          state={LeanCoffee.state}
                        />
                    }

                    <Header size='medium'>Topics</Header>
                    <List bulleted>

                      { LeanCoffee.topics.length
                        ? LeanCoffee.topics.map(topic => (
                          <List.Item>
                            <Header size='small'>
                              {topic.name}
                            <Label
                              color={getTopicColor(topic.state)}
                              key={topic.id}
                              pointing='left'
                              size='mini'
                              >
                                {topic.state}
                                <Label.Detail>
                                  {topic._votesMeta && topic._votesMeta.count}
                                </Label.Detail>
                              </Label>
                              </Header>
                          </List.Item>
                        ))
                        : <List.Item>There are no topics specified</List.Item>
                      }
                    </List>
                  </Item.Description>
                  <Item.Extra>
                    <Button floated='right' negative>Delete</Button>
                    <Button floated='right'>Add topic</Button>
                  </Item.Extra>
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
}

const getTopicColor = (topicState) => {
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

export default graphql(getLeanCoffee, {
  options: ({ match: { params: { id } } }) => ({ variables: { id } })
})(LeanCoffeeDetails)
