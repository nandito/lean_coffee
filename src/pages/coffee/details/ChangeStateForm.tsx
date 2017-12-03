import * as React from 'react'
import { Button, Form, Select } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import { COFFEE_STATE_NAMES } from '../constants'
import { getLeanCoffee, updateLeanCoffeeState } from '../../../graphql'
import {
  LeanCoffeeQueryVariables,
  LeanCoffeeState,
  updateLeanCoffeeMutation,
  updateLeanCoffeeMutationVariables
} from '../../../schema'

interface ChangeStateFormInputProps {
  id: string
  state: LeanCoffeeState
  userId: string
  hideForm(): void
}

interface ChangeStateFormMutationProps {
  submit({ id, state, userId }: { id: string, state: LeanCoffeeState, userId: string }): Promise<{
    data: updateLeanCoffeeMutation  
  }>
}

type ChangeStateFormProps = ChangeStateFormInputProps & ChangeStateFormMutationProps

interface ChangeStateFormState {
  state: LeanCoffeeState,
}

class ChangeStateForm extends React.Component<ChangeStateFormProps, ChangeStateFormState> {
  constructor(props: ChangeStateFormProps) {
    super(props)

    this.state = {
      state: props.state
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { hideForm, id, submit, userId } = this.props
    const { state } = this.state

    submit({ id, state, userId })
    hideForm()
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { state } = this.state
    const stateOptions = Object.keys(COFFEE_STATE_NAMES).map(key => (
      { text: COFFEE_STATE_NAMES[key], value: key }
    ))

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={stateOptions}
          value={state}
          required={true}
        />

        <Button type='submit' positive={true}>Update</Button>
        <Button onClick={this.props.hideForm}>Cancel</Button>
      </Form>
    )
  }
}

export default graphql<{}, ChangeStateFormInputProps>(updateLeanCoffeeState, {
  props: ({ mutate }) => ({
    submit: ({ id, state, userId }: updateLeanCoffeeMutationVariables & LeanCoffeeQueryVariables) => {
      if (!mutate) { return null }
      
      return mutate({
        refetchQueries: [{
          query: getLeanCoffee,
          variables: {
            leanCoffeeId: id,
            userId
          }
        }],
        variables: {
          id,
          state
        }
      })
    },
  }),
})(ChangeStateForm)
