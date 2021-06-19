import PropTypes from 'prop-types'
import React from 'react'

const PersonForm = ({ name, number, onChangeName, onChangeNumber, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onChangeName}/>
    </div>
    <div>
      number: <input value={number} onChange={onChangeNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

PersonForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onChangeName: PropTypes.func.isRequired,
  onChangeNumber: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default PersonForm