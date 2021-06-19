import PropTypes from 'prop-types'
import React from 'react'

const Notification = ({ message, color }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className={`notification ${color}`}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.oneOf(['red', 'green'])
}

export default Notification