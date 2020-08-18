const initialState = {
  message: 'this is a notification',
  show: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'HIDE':
    return { ...state, show: false }
  case 'SHOW':
    return { show: true, message: action.message, status: action.status }
  default:
    return state
  }
}

let timeout
export const setNotification = (message, status, duration = 5) => (
  async dispatch => {
    if (timeout) {
      clearTimeout(timeout)
    }
    dispatch({ type: 'SHOW', message, status })
    timeout = setTimeout(() => dispatch({ type: 'HIDE' }), duration * 1000)
  }
)

export default notificationReducer