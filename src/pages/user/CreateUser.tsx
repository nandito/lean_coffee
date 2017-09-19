import * as React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { Button, Form, } from 'semantic-ui-react'
import { createUser, getUser } from '../../graphql'

interface CreateUserProps {
  createUser: any;
  data: any;
  history: any;
}

class CreateUser extends React.Component<CreateUserProps, any> {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { createUser, history } = this.props
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      name: this.state.name,
    }

    createUser({ variables })
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

        { this.state.name && <Button type='submit'>Submit</Button> }
      </Form>
    )
  }
}

export default graphql(createUser, {name: 'createUser'})(
  graphql(getUser, { options: {fetchPolicy: 'network-only'}})(withRouter(CreateUser))
)
