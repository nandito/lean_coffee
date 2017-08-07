import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

const AuthControl = ({ auth }) => {
  return (
    <Menu.Menu position='right'>
      <Menu.Item>
        {/* { auth.isAuthenticated()
          ? <Button onClick={() => auth.logout()}>Log out</Button>
          : <Button primary onClick={() => auth.login()}>Log in</Button>
        } */}
      </Menu.Item>
    </Menu.Menu>
  )
}

export default AuthControl
