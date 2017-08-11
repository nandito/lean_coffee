import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import LoginAuth0 from '../../LoginAuth0'
import { logIn, logOut } from '../user/actions'
import { clientId, domain } from '../../App'

class AuthControl extends Component {
  componentDidMount() {
    if (this.props.data.user) {
      const { data: { user }, logIn } = this.props

      logIn(user)
    }
  }

  logout = () => {
    this.props.logOut()
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

const mapDispatchToProps = (dispatch) => ({
  logIn: ({ id, name }) => dispatch(logIn({ id, name })),
  logOut: () => dispatch(logOut()),
})

const AuthControlWithRouter = withRouter(AuthControl)

export default connect(null, mapDispatchToProps)(AuthControlWithRouter)
