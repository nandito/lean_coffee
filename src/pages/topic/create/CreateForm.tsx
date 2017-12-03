import * as React from 'react'
import { graphql } from 'react-apollo'
import { Button, Form, Select, } from 'semantic-ui-react'
import { TOPIC_STATE_NAMES } from '../constants'
import { createTopic, getTopicsOfLeanCoffee, getTopics } from '../../../graphql'
import { createTopicMutation, TopicState } from '../../../schema'

interface CreateTopicFormInputProps {
  leanCoffeeId: string
  userId: string
  removeForm(): void
}

interface CreateTopicFormMutationProps {
  submit(leanCoffeeId: string, name: string, state: TopicState, userId: string): Promise<{
    data: createTopicMutation
  }>
}

type CreateTopicFormProps = CreateTopicFormInputProps & CreateTopicFormMutationProps

interface CreateTopicFormState {
  name: string
  state: TopicState
}

class CreateTopicForm extends React.Component<CreateTopicFormProps, CreateTopicFormState> {
  constructor(props: CreateTopicFormProps) {
    super(props)

    this.state = {
      name: '',
      state: 'OPEN',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, state } = this.state
    const { removeForm, leanCoffeeId, submit, userId } = this.props

    submit(leanCoffeeId, name, state, userId)

    removeForm()
  }

  handleInputChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSelectChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { removeForm } = this.props
    const stateOptions = Object.keys(TOPIC_STATE_NAMES).map(key => (
      { text: TOPIC_STATE_NAMES[key], value: key }
    ))

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          onChange={this.handleInputChange}
          placeholder='Name'
          required={true}
          value={this.state.name}
        />
        <Form.Field
          disabled={true}
          label='State'
          control={Select}
          onChange={(e, { value }) => this.handleSelectChange('state', value)}
          options={stateOptions}
          placeholder='Select state'
          value={this.state.state}
          required={true}
        />
        <Button type='submit' positive={true}>Submit</Button>
        <Button onClick={removeForm}>Cancel</Button>
      </Form>
    )
  }
}

export default graphql<{}, CreateTopicFormInputProps>(createTopic, {
  props: ({ mutate }) => ({
    submit: (leanCoffeeId, name, state, userId) => {
      if (!mutate) { return null }
      
      if (leanCoffeeId) {
        return mutate({
          refetchQueries: [{
            query: getTopicsOfLeanCoffee,
            variables: { id: leanCoffeeId },
          }],
          variables: { leanCoffeeId, name, state, userId }
        })
      } else {
        return mutate({
          refetchQueries: [
            { query: getTopics },
          ],
          variables: { name, state, userId }
        })
      }
    },
  }),
})(CreateTopicForm)
