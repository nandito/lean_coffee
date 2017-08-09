import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => (
  <Dimmer inverted active>
    <Loader>Loading</Loader>
  </Dimmer>
)

export default Loading
