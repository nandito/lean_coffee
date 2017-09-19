import * as React from 'react'
// import PropTypes from 'prop-types'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

interface LoginAuth0Props {
  clientId: string;
  domain: string;
  history: any;
}

class LoginAuth0 extends React.Component<LoginAuth0Props, any> {
  private _lock: any

  constructor (props) {
    super(props)

    this._lock = new Auth0Lock(props.clientId, props.domain)
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.props.history.push(`/signup`)
    })
  }

  showLogin = () => {
    this._lock.show()
  }

  render() {
    return (
      <Button primary onClick={this.showLogin}>Log in</Button>
    )
  }
}

// LoginAuth0.propTypes = {
//   clientId: PropTypes.string.isRequired,
//   domain: PropTypes.string.isRequired,
//   history: PropTypes.object.isRequired,
// }

export default withRouter(LoginAuth0)
