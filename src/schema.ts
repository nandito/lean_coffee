/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type LeanCoffeeState =
  "TOPIC_COLLECTION" |
  "TOPIC_VOTING" |
  "DISCUSSION";


export type TopicState =
  "CURRENT" |
  "OPEN" |
  "CLOSED";


export type getLeanCoffeesQuery = {
  allLeanCoffees:  Array< {
    createdAt: string,
    id: string,
    state: LeanCoffeeState,
    topics:  Array< {
      id: string,
      name: string,
    } > | null,
    user:  {
      id: string,
      // Name of the user
      name: string,
    } | null,
  } >,
  user:  {
    id: string,
    // Name of the user
    name: string,
  } | null,
};

export type createLeanCoffeeMutationVariables = {
  userId: string,
  state: LeanCoffeeState,
};

export type createLeanCoffeeMutation = {
  createLeanCoffee:  {
    id: string,
  } | null,
};

export type LeanCoffeeQueryVariables = {
  leanCoffeeId: string,
  userId: string,
};

export type LeanCoffeeQuery = {
  LeanCoffee:  {
    id: string,
    user:  {
      id: string,
      // Name of the user
      name: string,
    } | null,
    createdAt: string,
    state: LeanCoffeeState,
    // Describes how many vote do the users have for the given Lean Coffee session.
    votesPerUser: number | null,
    // Meta information about the query.
    _votesMeta:  {
      count: number,
    },
  } | null,
  user:  {
    id: string,
    // Name of the user
    name: string,
  } | null,
};

export type updateLeanCoffeeMutationVariables = {
  id: string,
  state: LeanCoffeeState,
};

export type updateLeanCoffeeMutation = {
  updateLeanCoffee:  {
    id: string,
    state: LeanCoffeeState,
  } | null,
};

export type deleteLeanCoffeeMutationVariables = {
  id: string,
};

export type deleteLeanCoffeeMutation = {
  deleteLeanCoffee:  {
    id: string,
  } | null,
};

export type stateChangeSubscriptionSubscriptionVariables = {
  id: string,
};

export type stateChangeSubscriptionSubscription = {
  LeanCoffee:  {
    node:  {
      state: LeanCoffeeState,
    } | null,
  } | null,
};

export type getParticipantsQuery = {
  allParticipants:  Array< {
    id: string,
    name: string,
  } >,
};

export type createParticipantMutationVariables = {
  name: string,
};

export type createParticipantMutation = {
  createParticipant:  {
    id: string,
    name: string,
  } | null,
};

export type deleteParticipantMutationVariables = {
  id: string,
};

export type deleteParticipantMutation = {
  deleteParticipant:  {
    id: string,
  } | null,
};

export type getTopicsQuery = {
  allTopics:  Array< {
    id: string,
    name: string,
    state: TopicState,
    leanCoffee:  {
      createdAt: string,
    } | null,
    updatedAt: string,
    // Meta information about the query.
    _votesMeta:  {
      count: number,
    },
  } >,
};

export type createTopicMutationVariables = {
  name: string,
  state: TopicState,
  leanCoffeeId?: string | null,
  userId?: string | null,
};

export type createTopicMutation = {
  createTopic:  {
    id: string,
  } | null,
};

export type deleteTopicMutationVariables = {
  id: string,
};

export type deleteTopicMutation = {
  deleteTopic:  {
    id: string,
  } | null,
};

export type updateTopicMutationVariables = {
  id: string,
  state: TopicState,
};

export type updateTopicMutation = {
  updateTopic:  {
    id: string,
  } | null,
};

export type topicsOfCoffeeQueryVariables = {
  id: string,
};

export type topicsOfCoffeeQuery = {
  allTopics:  Array< {
    id: string,
    name: string,
    user:  {
      id: string,
      // Name of the user
      name: string,
    } | null,
    state: TopicState,
    // Meta information about the query.
    _votesMeta:  {
      count: number,
    },
  } >,
};

export type topicsOfLeanCoffeeSubscriptionSubscriptionVariables = {
  id: string,
};

export type topicsOfLeanCoffeeSubscriptionSubscription = {
  Topic:  {
    node:  {
      id: string,
      name: string,
      state: TopicState,
      user:  {
        // Name of the user
        name: string,
        id: string,
      } | null,
      // Meta information about the query.
      _votesMeta:  {
        count: number,
      },
    } | null,
    previousValues:  {
      id: string,
    } | null,
  } | null,
};

export type userQueryQuery = {
  user:  {
    id: string,
    // Name of the user
    name: string,
  } | null,
};

export type createUserMutationVariables = {
  idToken: string,
  name: string,
};

export type createUserMutation = {
  createUser:  {
    id: string,
  } | null,
};

export type createVoteMutationVariables = {
  leanCoffeeId: string,
  userId: string,
  topicId: string,
};

export type createVoteMutation = {
  createVote:  {
    id: string,
  } | null,
};

export type votesOfLeanCoffeeSubscriptionSubscriptionVariables = {
  id: string,
};

export type votesOfLeanCoffeeSubscriptionSubscription = {
  Vote:  {
    node:  {
      topic:  {
        id: string,
        // Meta information about the query.
        _votesMeta:  {
          count: number,
        },
      } | null,
    } | null,
  } | null,
};
/* tslint:enable */
