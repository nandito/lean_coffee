import * as React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => (
  <Dimmer inverted={true} active={true}>
    <Loader>Loading</Loader>
  </Dimmer>
)

export default Loading
