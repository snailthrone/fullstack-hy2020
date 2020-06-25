import React from 'react'

import './index.css'
import { string } from 'prop-types'

const Notification = ({ message, type }) => (
  <div className={`notification ${type}`}>{message}</div>
)

Notification.propTypes = {
  message: string.isRequired,
  type: string.isRequired
}

export default Notification