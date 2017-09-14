import React from 'react'
import PropTypes from 'prop-types'
import { Card, Feed } from 'semantic-ui-react'

const TopicFeed = ({ topics, cardTitle }) => (
  <Card>
    <Card.Content>
      <Card.Header>{cardTitle}</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        { topics.length
          ? topics.map(topic => (
              <Feed.Event key={topic.id}>
                <Feed.Content>
                  <Feed.Summary>{topic.name}</Feed.Summary>
                  <Feed.Meta>{topic._votesMeta.count} votes</Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            ))
          : <Feed.Event>
              <Feed.Content>
                <Feed.Summary>There are no {cardTitle.toLowerCase()} topics.</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
        }
      </Feed>
    </Card.Content>
  </Card>
)

TopicFeed.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
}

export default TopicFeed
