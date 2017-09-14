import React from 'react'
import PropTypes from 'prop-types'
import Collection from './views/Collection.jsx'
import Voting from './views/Voting.jsx'
import Discussion from './views/Discussion.jsx'

const LISTS = {
  'TOPIC_COLLECTION': Collection,
  'TOPIC_VOTING': Voting,
  'DISCUSSION': Discussion,
}

const TopicList = (props) => {
  const Handler = LISTS[props.coffeeState]

  return <Handler {...props} />
}

TopicList.propTypes = {
  coffeeState: PropTypes.oneOf(Object.keys(LISTS)).isRequired
}

export default TopicList
