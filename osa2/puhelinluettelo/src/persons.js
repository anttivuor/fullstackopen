import React from 'react'

const Item = ({ name, number, deletePerson }) => (
    <p>
        {name} {number}
        <button onClick={deletePerson}>delete</button>
    </p>
)

const Persons = ({ persons, deletePerson }) => (
    persons.map(p => (
        <Item
            name={p.name}
            number={p.number}
            deletePerson={() => deletePerson(p.name, p.id)}
            key={p.name}
        />
    ))
)

export default Persons