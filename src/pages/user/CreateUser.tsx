import * as React from 'react'
import { withRouter, Redirect, RouteComponentProps } from 'react-router'
import { compose, graphql } from 'react-apollo'
import { Button, Form, } from 'semantic-ui-react'
import { createUser, getUser } from '../../graphql'
import { createUserMutation, createUserMutationVariables, getUserQuery } from '../../schema'

interface CreateUserProps {
  data: {
    loading: boolean,
    user: getUserQuery['user'];
  }
  createUserWithAuthToken({ variables }: { variables: createUserMutationVariables}): Promise<{
    data: createUserMutation
  }>
}

interface State {
  name: string
}

class CreateUser extends React.Component<CreateUserProps & RouteComponentProps<{}>, State> {
  state = {
    name: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { createUserWithAuthToken, history } = this.props
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken') || '',
      name: this.state.name,
    }

    createUserWithAuthToken({ variables })
      .then((response) => {
        history.replace('/')
      }).catch((e) => {
        console.error(e)
        history.replace('/')
      })
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value })
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in')
      return (
        <Redirect to={{ pathname: '/' }}/>
      )
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' onChange={this.handleChange} value={this.state.name} />
        </Form.Field>

        {this.state.name && <Button type='submit'>Submit</Button>}
      </Form>
    )
  }
}

export default compose(
  graphql(createUser, { name: 'createUserWithAuthToken' }),
  graphql(getUser, { options: { fetchPolicy: 'network-only' } })
)(withRouter<{}>(CreateUser))
