import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import LoginAuth0 from './LoginAuth0'
import { clientId, domain } from '../../App'

class AuthControl extends React.Component<any, any> {
  logout = () => {
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

export default withRouter(AuthControl)
