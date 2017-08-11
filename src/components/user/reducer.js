import { types } from './actions'

const initialState = {
  name: null,
  id: null,
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
  case types.LOG_IN:
    return Object.assign(state, {
      name: payload.name,
      id: payload.id
    })
  case types.LOG_OUT:
  default:
    return state
  }
}

export default userReducer
