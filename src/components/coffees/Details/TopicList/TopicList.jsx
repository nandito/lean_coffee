import React from 'react'
import PropTypes from 'prop-types'
import Voting from './Voting.jsx'
import Collection from './Collection.jsx'

const LISTS = {
  'TOPIC_COLLECTION': Collection,
  'TOPIC_VOTING': Voting,
  'DISCUSSION': 'tbd',
}

const TopicList = (props) => {
  const Handler = LISTS[props.coffeeState]

  return <Handler {...props} />
}

TopicList.propTypes = {
  coffeeState: PropTypes.oneOf(Object.keys(LISTS)).isRequired
}

export default TopicList
