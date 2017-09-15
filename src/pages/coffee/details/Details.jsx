import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Item, Label, List, Message, Segment } from 'semantic-ui-react'
import { compose, graphql } from 'react-apollo'
import moment from 'moment'
import ChangeStateForm from './ChangeStateForm'
import TopicList from './topic-list/TopicList'
import { COFFEE_STATE_NAMES, COFFEE_STATE_COLORS } from '../constants'
import { Loading } from '../../../components'
import { deleteLeanCoffee, getLeanCoffee, getLeanCoffees, leanCoffeeStateSubscription, updateLeanCoffeeState } from '../../../graphql'

class LeanCoffeeDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      changeStateOpen: false,
    }
  }

  componentDidMount() {
    const { data, match: { params: { id } } } = this.props

    this.createLeanCoffeeSubscription = data.subscribeToMore({
      document: leanCoffeeStateSubscription,
      variables: { id },
      updateQuery: (previousState, {subscriptionData}) => {
        if (!subscriptionData.data) {
            return previousState
        }

        const newState = subscriptionData.data.LeanCoffee.node.state

        return Object.assign({}, previousState, {
          LeanCoffee: {
            ...previousState.LeanCoffee,
            state: newState,
          }
        })
      },
      onError: (err) => console.error(err),
    })
  }

  handleChangeStateOpen = () => {
    this.setState({
      changeStateOpen: true
    })
  }

  handleChangeStateClose = () => {
    this.setState({
      changeStateOpen: false
    })
  }

  handleDelete = () => {
    const { data: { LeanCoffee }, deleteLeanCoffee, history } = this.props

    deleteLeanCoffee(LeanCoffee.id).then(() => {
      history.push('/coffees')
    })
  }

  handleStateChange = (nextState) => {
    this.props.updateLeanCoffeeState(this.props.data.LeanCoffee.id, nextState)
  }

  renderControlButtons = (currentState) => (
    <Item.Extra>
     <Button floated='right' negative onClick={this.handleDelete}>Delete session</Button>
     { currentState === 'TOPIC_COLLECTION' &&
       <Button
         floated='right'
         color='blue'
         content='Start voting'
         onClick={() => this.handleStateChange('TOPIC_VOTING')}
       /> }
     { currentState === 'TOPIC_VOTING' &&
       <Button
         floated='right'
         color='blue'
         content='Start discussion'
         onClick={() => this.handleStateChange('DISCUSSION')}
       /> }
   </Item.Extra>
  )

  render() {
    const { data: { LeanCoffee, loading, user, error } } = this.props

    if (loading || !LeanCoffee) {
      return <Loading />
    }

    if (error) {
      return (
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>Check the console log to see the details.</p>
        </Message>
      )
    }

    const { changeStateOpen } = this.state
    const coffeeStateName = COFFEE_STATE_NAMES[LeanCoffee.state]
    const coffeeStateColor = COFFEE_STATE_COLORS[LeanCoffee.state]
    const currentUsersVoteCount = LeanCoffee.user && LeanCoffee.user.votesOnThisCoffee.count
    const votesLeft = LeanCoffee.votesPerUser - currentUsersVoteCount
    const currentUserIsTheHost = user.id === LeanCoffee.user.id

    return (
      <div>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>
            Coffee details
          </Header.Content>
          <Header.Subheader>
            { moment(LeanCoffee.createdAt).format('MMMM Do YYYY') }
          </Header.Subheader>
        </Header>

        <Segment loading={loading}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Meta>
                  <List horizontal divided>
                    <List.Item>
                      { currentUserIsTheHost
                        ? <Label
                            as='a'
                            color={coffeeStateColor}
                            onClick={this.handleChangeStateOpen}
                          >
                            <Icon name='edit'/> {coffeeStateName}
                          </Label>
                        : <Label color={coffeeStateColor}>
                            {coffeeStateName}
                          </Label>
                      }

                    </List.Item>
                    <List.Item>hosted by: {LeanCoffee.user ? LeanCoffee.user.name : 'N/A'}</List.Item>
                    <List.Item>each user has {LeanCoffee.votesPerUser} votes</List.Item>
                    <List.Item>you have {votesLeft} votes left</List.Item>
                  </List>
                </Item.Meta>

                <Item.Description>
                  {
                    currentUserIsTheHost && changeStateOpen
                    && <ChangeStateForm
                        hideForm={this.handleChangeStateClose}
                        id={LeanCoffee.id}
                        state={LeanCoffee.state}
                      />
                  }

                  <Header size='medium'>Topics</Header>

                  <TopicList
                    coffeeState={LeanCoffee.state}
                    leanCoffeeId={LeanCoffee.id}
                    leanCoffeeUserId={LeanCoffee.user.id}
                    loading={loading}
                    topics={LeanCoffee.topics}
                    userId={user.id}
                    votesLeft={votesLeft}
                  />
                </Item.Description>

                { currentUserIsTheHost && this.renderControlButtons(LeanCoffee.state) }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </div>
    )
  }
}

LeanCoffeeDetails.propTypes = {
  data: PropTypes.object.isRequired,
  deleteLeanCoffee: PropTypes.func.isRequired,
}

export default compose(
  graphql(getLeanCoffee, {
    options: ({ match: { params: { id } } }) => ({
      fetchPolicy: 'network-only',
      variables: { id },
    })
  }),
  graphql(deleteLeanCoffee, {
    props: ({ mutate }) => ({
      deleteLeanCoffee: (id) => mutate({
        refetchQueries: [
          { query: getLeanCoffees }
        ],
        variables: { id }
      })
    })
  }),
  graphql(updateLeanCoffeeState, {
    props: ({ mutate }) => ({
      updateLeanCoffeeState: (id, state) => mutate({
        refetchQueries: [
          { query: getLeanCoffees }
        ],
        variables: { id, state }
      })
    })
  })
)(LeanCoffeeDetails)
