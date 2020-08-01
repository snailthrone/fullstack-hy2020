import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { notification: { message, show } } = useSelector(state => state)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

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
