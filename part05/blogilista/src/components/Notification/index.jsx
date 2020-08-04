import React from 'react'
import { useSelector } from 'react-redux'

import './index.css'

const Notification = () => {
  const { notification: { message, status, show } } = useSelector(state => state)
  return show ? <div className={`notification ${status}`}>{message}</div> : false
}

export default Notification