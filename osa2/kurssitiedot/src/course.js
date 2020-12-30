import React from 'react'

const Header = ({ name = '' }) => (
    <h1>{name}</h1>
)

const Part = ({ part = {} }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts = [] }) => (
    <div>
      { parts.map(part => <Part part={part} key={`part_${part.id}`} />) }
    </div>
)

const Total = ({ parts }) => {
    const total = parts.reduce((p, c) => p + c.exercises, 0)
    return (
      <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
    )
}

const Course = ({ course = {} }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course