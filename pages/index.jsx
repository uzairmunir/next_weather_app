import React from 'react'
import SearchBox from '../components/SearchBox'
import FamousPlaces from '../components/FamousPlaces'

const index = () => {
  return (
    <div className="container mx-auto px-10 py-6">
      <SearchBox placeholder="Search for city...." />
      <FamousPlaces />
    </div>
  )
}

export default index
