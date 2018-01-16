import * as React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const NotFound = () => (
  <div>
    <Header as='h2' icon={true} textAlign='center'>
      <Icon name='exclamation' circular={true} />
      <Header.Content>
        Not Found
      </Header.Content>
      <Header.Subheader>
        The requested page does not exist.
      </Header.Subheader>
      <Header.Subheader>
        <a href='/'>Go to the home page.</a>
      </Header.Subheader>
    </Header>
  </div>
)

export default NotFound
