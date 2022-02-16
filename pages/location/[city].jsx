import React from 'react'
import cities from '../../services/city.list.json'
import SearchBox from '../../components/SearchBox'
import TodaysWeather from '../../components/TodaysWeather'
import WeeklyWeather from '../../components/WeeklyWeather'
import Link from 'next/link'
import moment from 'moment-timezone'
import HourlyWeather from '../../components/HourlyWeather'

const CityDetails = ({ city, weeklyWeather, timezone, hourlyWeather }) => {
  console.log(hourlyWeather)
  return (
    <div className="container mx-auto px-10 py-6">
      <div className="container mx-auto mb-4 lg:w-3/4">
        <Link href="/">
          <a className="text-2xl text-gray-500 hover:text-blue-500">
            &larr; Home
          </a>
        </Link>
      </div>
      <SearchBox city={city} placeholder="Search for another city" />
      <TodaysWeather
        city={city}
        weather={weeklyWeather[0]}
        timezone={timezone}
      />
      <HourlyWeather weather={hourlyWeather} timezone={timezone} />
      <WeeklyWeather weather={weeklyWeather} timezone={timezone} />
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
  const hourlyWeather = getHourlyWeather(data?.hourly, data?.timezone)

  return {
    props: {
      city: city,
      timezone: data?.timezone,
      currentWeather: data?.current,
      weeklyWeather: weeklyWeather,
      hourlyWeather: hourlyWeather,
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
//
const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf('day').valueOf()
  const eodTimeStamp = Math.floor(endOfDay / 1000)

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp)

  return todaysData
}
