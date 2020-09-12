import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, show }) => {
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

const mapStateToProps = ({ notification }) => notification

export default connect(mapStateToProps)(Notification)
