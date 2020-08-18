import React from 'react'
import { useSelector } from 'react-redux'

import * as s from './index.styled'

const Notification = () => {
  const { notification: { message, status, show } } = useSelector(state => state)
  return show ? <s.Notification status={status}>{message}</s.Notification> : false
}

export default Notification