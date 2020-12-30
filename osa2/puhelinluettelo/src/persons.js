import React from 'react'

const Item = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons }) => persons.map(p => <Item name={p.name} number={p.number} key={p.name} />)

export default Persons