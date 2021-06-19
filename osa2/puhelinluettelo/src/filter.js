import PropTypes from 'prop-types'
import React from 'react'

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default Filter