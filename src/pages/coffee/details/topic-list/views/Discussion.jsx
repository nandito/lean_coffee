import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Divider, Header, List } from 'semantic-ui-react'
import { TopicFeed } from '../../../../../components'

const Discussion = ({ leanCoffeeId, loading, topics, userId }) => {
  if (loading) { return <div>loading...</div> }

  if (!topics.length) {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>
            There are no topics to discuss
          </Card.Header>
          <Card.Description>
            Add some topics when the session is in topic collection state.
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }

  const currentTopic = topics.filter(topic => topic.state === 'CURRENT')[0]
  const upcomingTopics = topics.filter(topic => topic.state === 'OPEN')
  const closedTopics = topics.filter(topic => topic.state === 'CLOSED')

  return (
    <div>
      <Card.Group stackable>
        { currentTopic
          ? (<Card centered>
              <Card.Content>
                <Divider horizontal>Current topic</Divider>

                <Card.Description>
                  <Header as='h2' content={currentTopic.name} textAlign='center' />
                </Card.Description>

                <Divider />

                <Card.Meta>
                  <List horizontal divided>
                    <List.Item>added by {(currentTopic.user && currentTopic.user.name) || 'N/A'}</List.Item>
                    <List.Item>has {currentTopic._votesMeta.count} votes</List.Item>
                  </List>
                </Card.Meta>

              </Card.Content>
            </Card>)
          : (<Card centered>
              <Card.Content textAlign='center'>
                { upcomingTopics.length
                  ? <Button color='blue'>Discuss a topic</Button>
                  : <Card.Header>
                      There are no more topics.
                    </Card.Header>
                }
              </Card.Content>
            </Card>)
        }
      </Card.Group>

      <Card.Group itemsPerRow='2' stackable>
        <TopicFeed cardTitle='Upcoming' topics={upcomingTopics}/>
        <TopicFeed cardTitle='Closed' topics={closedTopics}/>
      </Card.Group>

    </div>
  )
}

Discussion.propTypes = {
  leanCoffeeId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  topics: PropTypes.array,
  userId: PropTypes.string.isRequired,
}

export default Discussion
