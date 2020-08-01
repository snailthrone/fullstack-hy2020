import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { hideNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const { notification: { message, show } } = useSelector(state => state)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    if (show) {
      window.setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
    }
  }, [dispatch, show])

  if (show) {
    return (
      <div style={style}>
        { message }
      </div>
    )
  }
  return false
}

export default Notification
