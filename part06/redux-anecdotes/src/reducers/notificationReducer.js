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

export const notify = message => ({ type: 'NOTIFY', message })

export const hideNotification = () => ({ type: 'HIDE' })

export default notificationReducer