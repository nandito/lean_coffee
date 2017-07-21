import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Label, List, Segment, Item } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import moment from 'moment'
import { getLeanCoffee } from '../../graphql'

class LeanCoffeeDetails extends Component {
  render() {
    const { data: { LeanCoffee, loading } } = this.props

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
                      <List.Item>{ getCoffeeState(LeanCoffee.state) }</List.Item>
                      <List.Item>hosted by: {LeanCoffee.host ? LeanCoffee.host.name : 'N/A'}</List.Item>
                    </List>
                  </Item.Meta>

                  <Item.Description>
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
                    <Button floated='right'>Change state</Button>
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

const getCoffeeState = (coffeeState) => {
  switch (coffeeState) {
    case 'TOPIC_VOTING':
      return <Label color='pink'>Topic voting</Label>
    case 'TOPIC_COLLECTION':
      return <Label color='purple'>Topic collection</Label>
    case 'DISCUSSION':
      return <Label color='violet'>Discussion</Label>
    default:
      return <span>N/A</span>
  }
}

export default graphql(getLeanCoffee, {
  options: ({ match: { params: { id } } }) => ({ variables: { id } })
})(LeanCoffeeDetails)
