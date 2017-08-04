import React from 'react'
import { Button, Menu } from 'semantic-ui-react'
import Auth from '../../auth/Auth'

const AuthControl = () => {
  const auth = new Auth()
  const { isAuthenticated } = auth

  return (
    <Menu.Menu position='right'>
      <Menu.Item>
        { isAuthenticated()
          ? <Button onClick={() => auth.logout()}>Log out</Button>
          : <Button primary onClick={() => auth.login()}>Log in</Button>
        }
      </Menu.Item>
    </Menu.Menu>
  )
}

export default AuthControl
