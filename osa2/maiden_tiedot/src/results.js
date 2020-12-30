import axios from 'axios'
import React, { useEffect, useState } from 'react'

const apiKey = process.env.REACT_APP_API_KEY

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState()

    const fetchWeather = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                setWeather(res.data.current)
            } else {
                alert('Failed to fetch weather data')
            }
        })
        .catch(error => {
            console.error(error)
            alert('Failed to fetch weather data')
        })
    }

    useEffect(fetchWeather, [country])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h3>langauges</h3>
            <ul>
                { country.languages.map(({ name }) => <li key={`language_row_${name}`}>{name}</li>) }
            </ul>

            <img src={country.flag} alt={`Flag of ${country.flag}`} style={{ maxWidth: 200 }} />

            { weather !== undefined &&
                <>
                    <h3>Weather in {country.capital}</h3>
                    <p><span style={{ fontWeight: 'bold' }}>temperature:</span> {weather.temperature} Celcius</p>
                    { weather.weather_icons.map(icon => <img src={icon} alt={'Weather icon'} style={{ maxWidth: 50 }} key={`weather_icon_${icon}`} /> )}
                    <p><span style={{ fontWeight: 'bold' }}>wind:</span> {weather.wind_speed} mph direction {weather.wind_dir}</p>
                </>
            }
        </div>
    )
}

const Row = ({ country, selectCountry }) => (
    <div>
        {country.name}
        <button onClick={selectCountry}>show</button>
    </div>
)

const Results = ({ results, selectedCountry, selectCountry }) => {
    if (selectedCountry !== undefined) {
        return <CountryDetails country={selectedCountry} />
    }
    if (results.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    } else if (results.length === 0) {
        return <div>No matches, try another filter</div>
    } else if (results.length !== 1) {
        return results.map(result => (
            <Row
                country={result}
                selectCountry={() => selectCountry(result.name)}
                key={`country_row_${result.name}`}
            />
        ))
    } else { // Only possible scenario left is that array has length of one
        return <CountryDetails country={results[0]} />
    }
}

export default Results