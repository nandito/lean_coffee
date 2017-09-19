import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { CreateUser, Home, LeanCoffeeDetails, ListLeanCoffees, ListParticipants, ListTopics } from './pages'
import { Loading, Navbar } from './components'
import { getUser } from './graphql'

export const clientId = 'tdJNe4V3XWxqNAQYhrK0FbrDzW3jbPcq'
export const domain='lean-coffee.eu.auth0.com'

class App extends React.Component<any, any> {
  render () {
    if (this.props.data.loading) {
      return <Loading />
    }

    const isAuthenticated = (this.props.data.user)
    const userId = isAuthenticated && this.props.data.user.id

    return (
      <Container>
        <Navbar data={this.props.data} />

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={CreateUser}/>

          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/participants" component={ListParticipants} />
          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/coffees" component={ListLeanCoffees}/>
          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/coffees/:id" component={LeanCoffeeDetails} userId={userId} />
          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/topics" component={ListTopics}/>
        </Switch>
      </Container>
    )
  }
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  exact?: boolean;
  path: string;
  component: any;
  userId?: any;
}

const PrivateRoute = ({ component: Component, isAuthenticated, userId, ...rest }: PrivateRouteProps) => (
  <Route {...rest} render={props => (
    (isAuthenticated)
    ? <Component userId={userId} {...props}/>
    : <Redirect to={{
        pathname: '/',
        state: { from: props.location },
      }}/>
    )
  }/>
)

export default graphql(getUser, { options: { fetchPolicy: 'network-only' }})(App)
