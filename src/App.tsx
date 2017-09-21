import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { DefaultChildProps, graphql } from 'react-apollo'
import { CreateUser, Home, LeanCoffeeDetails, ListLeanCoffees, ListParticipants, ListTopics } from './pages'
import { Loading, Navbar } from './components'
import { getUser } from './graphql'
import { getUserQuery } from './schema'

export const clientId = 'tdJNe4V3XWxqNAQYhrK0FbrDzW3jbPcq'
export const domain = 'lean-coffee.eu.auth0.com'

interface AppProps {
  data: {
    loading: boolean;
    user: getUserQuery['user'];
  }
}

class App extends React.Component<DefaultChildProps<AppProps, getUserQuery>, {}> {
  render () {
    const { loading, user } = this.props.data

    if (loading) {
      return <Loading />
    }

    const isAuthenticated: boolean = typeof user !== 'undefined' && user !== null
    const userId: string | undefined = user && user.id || undefined

    return (
      <Container>
        <Navbar data={this.props.data} />

        <Switch>
          <Route exact={true} path='/' component={Home}/>
          <Route exact={true} path='/signup' component={CreateUser}/>

          <PrivateRoute
            component={ListParticipants}
            exact={true}
            isAuthenticated={isAuthenticated}
            path='/participants'
          />
          <PrivateRoute
            component={ListLeanCoffees}
            exact={true}
            isAuthenticated={isAuthenticated}
            path='/coffees'
          />
          <PrivateRoute
            component={LeanCoffeeDetails}
            exact={true}
            isAuthenticated={isAuthenticated}
            path='/coffees/:id'
            userId={userId}
          />
          <PrivateRoute
            component={ListTopics}
            exact={true}
            isAuthenticated={isAuthenticated}
            path='/topics'
          />
        </Switch>
      </Container>
    )
  }
}

interface PrivateRouteProps {
  isAuthenticated: boolean;
  exact?: boolean;
  path: string;
  component: new() => React.Component<{}, {}>;
  userId?: string | boolean;
}

const PrivateRoute = ({ component: Component, isAuthenticated, userId, ...rest }: PrivateRouteProps) => (
  <Route
    {...rest}
    render={props => (
      (isAuthenticated)
      ? <Component userId={userId} {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )}
  />
)

export default graphql<getUserQuery>(getUser, {
  options: { fetchPolicy: 'network-only' }
})(App)
