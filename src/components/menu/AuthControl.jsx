import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import { Button, Menu } from 'semantic-ui-react'
import LoginAuth0 from '../../LoginAuth0'
import { clientId, domain } from '../../App'

class AuthControl extends Component {
  logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    window.location.reload()
  }

  isLoggedIn = () => {
    return this.props.data.user
  }

  render() {
    return (
      <Menu.Menu position='right'>
        <Menu.Item>
          { this.isLoggedIn()
            ? <Button onClick={() => this.logout()}>Log out</Button>
            : <LoginAuth0 clientId={clientId} domain={domain} />
          }
        </Menu.Item>
      </Menu.Menu>
    )
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(AuthControl))
