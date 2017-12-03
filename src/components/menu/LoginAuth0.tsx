import * as React from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter, IInjectedProps } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

interface LoginAuth0Props {
  clientId: string;
  domain: string;
}

type Props = IInjectedProps & LoginAuth0Props

class LoginAuth0 extends React.Component<Props, {}> {
  private _lock: Auth0LockStatic

  constructor(props: Props) {
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
      <Button primary={true} onClick={this.showLogin}>Log in</Button>
    )
  }
}

export default withRouter(LoginAuth0)
