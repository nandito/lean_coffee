import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Menu } from 'semantic-ui-react'
import LoginAuth0 from './LoginAuth0'
import { clientId, domain } from '../../App'
import { getUserQuery } from '../../schema'

interface Props {
  data: {
    user: getUserQuery['user']
  }
}

class AuthControl extends React.Component<Props & RouteComponentProps<{}>, {}> {
  logout = (): void => {
    window.localStorage.removeItem('auth0IdToken')
    window.location.reload()
  }

  isLoggedIn = (): boolean => this.props.data.user !== null

  render() {
    return (
      <Menu.Menu position='right'>
        <Menu.Item>
          { this.isLoggedIn()
            ? <Button onClick={this.logout}>Log out</Button>
            : <LoginAuth0 clientId={clientId} domain={domain} />
          }
        </Menu.Item>
      </Menu.Menu>
    )
  }
}

export default withRouter<Props>(AuthControl)
