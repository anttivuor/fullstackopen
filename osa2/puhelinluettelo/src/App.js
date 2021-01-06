import React, { useEffect, useState } from 'react'

import Filter from './filter'
import PersonForm from './personForm'
import Persons from './persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const onSubmit = event => {
    event.preventDefault()

    const existing = persons.find(({ name }) => name === newName)
    if (existing !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(existing, newNumber)
      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons[persons.length - 1].id + 1 }
      personService.create(newPerson)
      .catch(error => {
        alert('Couldn\'t save new person to database')
        console.error(error)
      })
      setPersons([...persons, newPerson])
      setNewName('')
      setNewNumber('')
    }
  }

  const updatePerson = (person, number) => {
    const newPerson = { ...person, number }
    personService.update(person.id, newPerson)
    .then(res => {
      const newPersons = persons.map(p => {
        if (p.id === person.id) return newPerson
        else return p
      })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    })
    .catch(error => {
      console.error(error)
      alert('Failed to update existing person')
    })
  }

  const fetchData = () => {
    personService.getAll()
    .then(res => {
        setPersons(res)
    })
    .catch(error => {
      console.error(error)
      alert('Failed to fetch phonebook data')
    })
  }

  useEffect(fetchData, [])

  const askToDelete = (name, id) => {
    if (window.confirm(`Do you really want to remove ${name}?`)) {
      deletePerson(id)
    }
  }

  const deletePerson = id => {
    personService.remove(id)
    .then(res => {
      if (res.status === 200) {
        setPersons(persons.filter(p => p.id !== id))
      } else {
        alert('Failed to delete person from database')
      }
    })
    .catch(error => {
      alert('Failed to delete person from database')
      console.error(error)
    })
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
      <Persons
        persons={persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))}
        deletePerson={askToDelete}
      />
    </div>
  )

}

export default App