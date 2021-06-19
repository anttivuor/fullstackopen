import React, { useEffect, useState } from 'react'

import Filter from './filter'
import Notification from './notification'
import PersonForm from './personForm'
import Persons from './persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  const onSubmit = event => {
    event.preventDefault()

    const existing = persons.find(({ name }) => name === newName)
    if (existing !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existing, newNumber)
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
      .then(res => {
        console.log('res', res)
        setPersons([...persons, res])
        setNewName('')
        setNewNumber('')
        setNotification({ message: `Added ${newPerson.name}`, color: 'green' })
        setTimeout(() => setNotification({}), 5000)
      })
      .catch(error => {
        const message = error.response?.data?.error || error.message
        setNotification({ message: `Failed to add ${newPerson.name} (${message})`, color: 'red' })
        setTimeout(() => setNotification({}), 5000)
      })
    }
  }

  const updatePerson = (person, number) => {
    const newPerson = { ...person, number }
    personService.update(person.id, newPerson)
    .then(res => {
      const newPersons = persons.map(p => {
        if (p.id === person.id) return res
        else return p
      })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
      setNotification({ message: `Updated ${newPerson.name}`, color: 'green' })
      setTimeout(() => setNotification({}), 5000)
    })
    .catch(error => {
      setNotification({ message: `Failed to edit ${newPerson.name}`, color: 'red' })
      setTimeout(() => setNotification({}), 5000)
    })
  }

  const fetchData = () => {
    personService.getAll()
    .then(res => {
        setPersons(res)
    })
    .catch(error => {
      setNotification({ message: 'Failed to fetch data', color: 'red' })
      setTimeout(() => setNotification({}), 5000)
    })
  }

  useEffect(fetchData, [])

  const askToDelete = (name, id) => {
    if (window.confirm(`Do you really want to remove ${name}?`)) {
      deletePerson(name, id)
    }
  }

  const deletePerson = (name, id) => {
    personService.remove(id)
    .then(res => {
      setPersons(persons.filter(p => p.id !== id))
      setNotification({ message: `Deleted ${name}`, color: 'green' })
      setTimeout(() => setNotification({}), 5000)
    })
    .catch(error => {
      setNotification({ message: `Failed to delete ${name} (information may already be deleted)`, color: 'red' })
      setTimeout(() => setNotification({}), 5000)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} color={notification.color} />

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
      <Persons
        persons={persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))}
        deletePerson={askToDelete}
      />
    </div>
  )

}

export default App