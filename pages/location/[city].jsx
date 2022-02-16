import React from 'react'
import cities from '../../services/city.list.json'
import SearchBox from '../../components/SearchBox'
import TodaysWeather from '../../components/TodaysWeather'

const CityDetails = ({ city, weeklyWeather, timezone, currentWeather }) => {
  return (
    <div className="container mx-auto px-10 py-6">
      <SearchBox placeholder="Search for another city" />
      <TodaysWeather
        city={city}
        weather={weeklyWeather[0]}
        timezone={timezone}
      />
    </div>
  )
}

export default CityDetails

export async function getServerSideProps(context) {
  const city = getCityId(context.params.city)
  if (!city) {
    return {
      notFound: true,
    }
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.NEXT_API_KEY}&exclude=minutely&units=metric`
  )
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }
  const weeklyWeather = data?.daily

  return {
    props: {
      city: city,
      timezone: data?.timezone,
      currentWeather: data?.current,
      weeklyWeather: weeklyWeather,
    },
  }
}

// Get city id
export const getCityId = (params) => {
  const cityParams = params.trim()
  // get id of the city
  const splitCity = cityParams.split('-')
  const id = splitCity[splitCity.length - 1]
  if (!id) {
    return null
  }

  const city = cities.find((city) => city.id.toString() === id)
  if (city) {
    return city
  } else {
    return null
  }
}
