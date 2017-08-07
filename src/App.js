import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LeanCoffeeDetails from './components/coffees/Details/Details'
import ListLeanCoffees from './components/coffees/List'
import ListParticipants from './components/participants/List'
import ListTopics from './components/topics/List'
import Home from './components/Home'
import Loading from './components/loading/Loading'
import TopMenu from './components/TopMenu'
import CreateUser from './components/user/CreateUser'
// import Auth from './auth/Auth'
import LoginAuth0 from './LoginAuth0'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
// const auth = new Auth()

// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication()
//   }
// }

const clientId = 'tdJNe4V3XWxqNAQYhrK0FbrDzW3jbPcq'
const domain='lean-coffee.eu.auth0.com'

class App extends Component {
  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    window.location.reload()
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render () {
    if (this.props.data.loading) {
      return <Loading />
    }

    return (
      <Container>
        <TopMenu />

        <Switch>
          {/* <Route exact path="/" component={Home}/> */}
          <Route exact path="/participants" component={ListParticipants}/>
          <Route exact path="/coffees" component={ListLeanCoffees}/>
          <Route exact path="/coffees/:id" component={LeanCoffeeDetails}/>
          <Route exact path="/topics" component={ListTopics}/>
          <Route exact path="/signup" component={CreateUser}/>
          <Route path="/" render={(props) => {
              // handleAuthentication(props)
              if (this._isLoggedIn()) {
                return this.renderLoggedIn()
              } else {
                return this.renderLoggedOut()
              }
          }}/>
        </Switch>
      </Container>
    )
  }

  renderLoggedIn() {
    return (
      <div>
        <div className='pv3'>
          <span
            className='dib bg-red white pa3 pointer dim'
            onClick={this._logout}
          >
            Logout
          </span>
        </div>
        <div>LOGGED IN!</div>
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className='pv3'>
          <LoginAuth0
            clientId={clientId}
            domain={domain}
          />
        </div>
        <span>Log in to create new posts</span>
      </div>
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

export default graphql(userQuery, { options: {fetchPolicy: 'network-only' }})(withRouter(App))


  // render() {
  //   return (
  //   <Container>
  //     <TopMenu auth={auth} />
  //
  //     <Switch>
  //       <Route exact path="/" component={Home}/>
  //       <Route exact path="/participants" component={ListParticipants}/>
  //       <Route exact path="/coffees" component={ListLeanCoffees}/>
  //       <Route exact path="/coffees/:id" component={LeanCoffeeDetails}/>
  //       <Route exact path="/topics" component={ListTopics}/>
  //       <Route exact path="/signup" component={SignUp}/>
  //       <Route path="/callback" render={(props) => {
  //           handleAuthentication(props)
  //           return <Loading {...props} />
  //       }}/>
  //     </Switch>
  //   </Container>
  //   )
  // }
// }

// export default App
