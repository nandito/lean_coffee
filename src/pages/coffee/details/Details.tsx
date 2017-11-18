import * as React from 'react'
import { Button, Header, Icon, Item, Label, List, Message, Segment } from 'semantic-ui-react'
import { RouteComponentProps } from 'react-router'
import { compose, graphql, QueryProps } from 'react-apollo'
import * as moment from 'moment'
import ChangeStateForm from './ChangeStateForm'
import TopicList from './topic-list/TopicList'
import { COFFEE_STATE_NAMES, COFFEE_STATE_COLORS } from '../constants'
import { Loading } from '../../../components'
import {
  deleteLeanCoffee,
  getLeanCoffee,
  getLeanCoffees,
  leanCoffeeStateSubscription,
  updateLeanCoffeeState
} from '../../../graphql'
import {
  deleteLeanCoffeeMutation,
  LeanCoffeeState,
  LeanCoffeeQuery,
  updateLeanCoffeeMutation
} from '../../../schema'

interface LeanCoffeeDetailsProps {
  data: QueryProps & LeanCoffeeQuery
  deleteLeanCoffeeAndRefetchCoffees(id: string): Promise<{
    data: deleteLeanCoffeeMutation
  }>
  updateLeanCoffeeStateAndRefetchCoffee(id: string, state: LeanCoffeeState, userId: string): Promise<{
    data: updateLeanCoffeeMutation
  }>
}

type WrappedProps = LeanCoffeeDetailsProps & RouteComponentProps<{ id: string }>

interface LeanCoffeeDetailsState {
  changeStateOpen: boolean
}

class LeanCoffeeDetails extends React.Component<WrappedProps, LeanCoffeeDetailsState> {
  private createLeanCoffeeSubscription: () => void

  constructor(props: WrappedProps) {
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
      updateQuery: (previousState: LeanCoffeeQuery, {subscriptionData}) => {
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
    const { data: { LeanCoffee }, deleteLeanCoffeeAndRefetchCoffees, history } = this.props
    const leanCoffeeId = LeanCoffee && LeanCoffee.id || ''
    
    deleteLeanCoffeeAndRefetchCoffees(leanCoffeeId).then(() => {
      history.push('/coffees')
    })
  }

  handleStateChange = (nextState) => {
    const { data: { LeanCoffee, user }, updateLeanCoffeeStateAndRefetchCoffee } = this.props
    const userId = user && user.id || ''
    const leanCoffeeId = LeanCoffee && LeanCoffee.id || ''

    updateLeanCoffeeStateAndRefetchCoffee(leanCoffeeId, nextState, userId)
  }

  renderControlButtons = (currentState) => (
    <Item.Extra>
     <Button floated='right' negative={true} onClick={this.handleDelete}>Delete session</Button>
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
        <Message negative={true}>
          <Message.Header>Something went wrong</Message.Header>
          <p>Check the console log to see the details.</p>
        </Message>
      )
    }

    const { changeStateOpen } = this.state
    const coffeeStateName = COFFEE_STATE_NAMES[LeanCoffee.state]
    const coffeeStateColor = COFFEE_STATE_COLORS[LeanCoffee.state]
    const currentUsersVoteCount = LeanCoffee._votesMeta.count
    const votesLeft = (LeanCoffee.votesPerUser && LeanCoffee.votesPerUser - currentUsersVoteCount) || 0
    const currentUserIsTheHost = (user && user.id) === (LeanCoffee.user && LeanCoffee.user.id)

    return (
      <div>
        <Header as='h2' icon={true} textAlign='center'>
          <Header.Content>
            Coffee details
          </Header.Content>
          <Header.Subheader>
            {moment(LeanCoffee.createdAt).format('MMMM Do YYYY')}
          </Header.Subheader>
        </Header>

        <Segment loading={loading}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Meta>
                  <List horizontal={true} divided={true}>
                    <List.Item>
                      { currentUserIsTheHost
                        ? <Label as='a' color={coffeeStateColor} onClick={this.handleChangeStateOpen} >
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
                        userId={user && user.id || ''}
                    />
                  }

                  <Header size='medium'>Topics</Header>

                  <TopicList
                    coffeeState={LeanCoffee.state}
                    leanCoffeeId={LeanCoffee.id}
                    leanCoffeeUserId={LeanCoffee.user && LeanCoffee.user.id || ''}
                    loading={loading}
                    userId={user && user.id || ''}
                    votesLeft={votesLeft}
                  />
                </Item.Description>

                {currentUserIsTheHost && this.renderControlButtons(LeanCoffee.state)}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </div>
    )
  }
}

export default compose(
  graphql<{}>(getLeanCoffee, {
    options: ({ match: { params: { id } }, userId }: RouteComponentProps<{ id: string }> & { userId: string }) => ({
      fetchPolicy: 'network-only',
      variables: {
        leanCoffeeId: id,
        userId,
      },
    })
  }),
  graphql(deleteLeanCoffee, {
    props: ({ mutate }) => ({
      deleteLeanCoffeeAndRefetchCoffees: (id) => {
        if (!mutate) { return null }
        
        return mutate({
          refetchQueries: [
            { query: getLeanCoffees }
          ],
          variables: { id }
        })
      },
    })
  }),
  graphql(updateLeanCoffeeState, {
    props: ({ mutate }) => ({
      updateLeanCoffeeStateAndRefetchCoffee: (id, state, userId) => {
        if (!mutate) { return null }

        return mutate({
          refetchQueries: [
            {
              query: getLeanCoffee,
              variables: {
                leanCoffeeId: id,
                userId,
              },
            }
          ],
          variables: { id, state }
        })
      }
    })
  })
)(LeanCoffeeDetails)
