import React from 'react'

const Notification = ({ message, state }) => (
  <div className={`notification ${state}`}>{message}</div>
)

export default Notification