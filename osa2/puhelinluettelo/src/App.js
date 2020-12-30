import React, { useState } from 'react'

import Filter from './filter'
import PersonForm from './personForm'
import Persons from './persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const onSubmit = event => {
    event.preventDefault()

    if (persons.find(({ name }) => name === newName) !== undefined) return alert(`${newName} is already added to phonebook`)

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={e => setFilter(e.target.value)} />

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        onChangeName={e => setNewName(e.target.value)}
        onChangeNumber={e => setNewNumber(e.target.value)}
        onSubmit={onSubmit}
      />

      <h2>Numbers</h2>
      <Persons persons={persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )

}

export default App