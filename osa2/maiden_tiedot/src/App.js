import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Results from './results'
import Search from './search'

const App = () => {
  const [data, setData] = useState([])
  const [selectedCountry, selectCountry] = useState()
  const [search, setSearch] = useState('')

  const fetchData = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        setData(res.data)
      } else {
        alert('Failed to load data')
      }
    })
    .catch(error => {
      console.error(error)
      alert('Failed to load data')
    })
  }

  useEffect(fetchData, [])

  const onSearch = e => {
    setSearch(e.target.value)
    selectCountry(undefined)
  }

  return (
    <div>
      <Search value={search} onChange={onSearch} />
      <Results
        results={data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))}
        selectCountry={name => selectCountry(data.find(c => c.name === name))}
        selectedCountry={selectedCountry}
      />
    </div>
  )
}

export default App