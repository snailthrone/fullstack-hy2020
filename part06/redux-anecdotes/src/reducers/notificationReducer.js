const initialState = {
  message: '',
  show: false,
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HIDE':
      return { ...state, show: false }
    case 'NOTIFY':
      return { show: true, message: action.message }  
    default:
      return state
  }
}

export const setNotification = (message, duration) => (
  async dispatch => {
    dispatch({ type: 'NOTIFY', message })
    await new Promise(() => setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, duration * 1000))
  }
)

export default notificationReducer