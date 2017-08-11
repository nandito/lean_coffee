export const types = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
}

export const logIn = ({ id, name }) => ({
  type: types.LOG_IN,
  payload: {
    id,
    name,
  }
})

export const logOut = () => ({
  type: types.LOG_OUT,
})
