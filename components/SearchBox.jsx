import Link from 'next/link'
import React, { useState } from 'react'
import cities from '../services/city.list.json'

const SearchBox = ({ placeholder }) => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // function to handle on change
  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)

    const matchingCities = []
    if (value.length > 3) {
      for (let city of cities) {
        if (matchingCities.length >= 5) {
          break
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase())
        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`,
          }
          matchingCities.push(cityData)
          continue
        }
      }
    }
    return setSearchResults(matchingCities)
  }

  return (
    <div className="container mx-auto lg:mt-4 lg:w-3/4">
      <input
        value={search}
        placeholder={placeholder}
        onChange={handleOnChange}
        type="text "
        className="h-20 w-full rounded-lg border-2 border-blue-500 bg-gray-100 bg-gray-100 p-4 text-lg text-gray-700 outline-none focus:border-0 focus:ring-2 focus:ring-gray-200"
      />
      {search.length > 3 && (
        <ul className="mt-4 w-full rounded-lg border-2 border-blue-500 py-6 px-4 ">
          {searchResults.length > 0 ? (
            searchResults.map((city, index) => (
              <Link href={`/location/${city.slug}`} key={index}>
                <a
                  className={`block py-4 text-xl font-semibold ${
                    index === searchResults.length - 1 ? 'border-0' : 'border-b'
                  } hover:text-blue-500 `}
                >
                  {city.name}
                  {city.state ? `, ${city.state}` : ''}{' '}
                  <span>({city.country})</span>
                </a>
              </Link>
            ))
          ) : (
            <li>No Results Found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
