import moment from 'moment-timezone'
import Image from 'next/image'
import React from 'react'

const TodaysWeather = ({ city, weather, timezone }) => {
  return (
    <div className="container mx-auto mt-4 rounded-lg bg-blue-700 p-6   text-white lg:w-3/4">
      <div className="flex justify-between align-middle lg:px-4">
        <div className="block">
          <h3 className="pb-2 text-3xl font-semibold">
            {city.name} ({city.country})
          </h3>
          <h2 className="py-2 text-2xl font-semibold italic">
            <span>{weather.temp.max.toFixed(0)}&deg;C</span>
            <span className="ml-2 text-gray-300">
              {weather.temp.min.toFixed(0)}&deg;C
            </span>
          </h2>
          <div className="flex py-4">
            <div className="flex-col">
              <h3 className="text-xl font-semibold">Sunrise</h3>
              <h3 className="text-lg ">
                {' '}
                {moment.unix(weather.sunrise).tz(timezone).format('LT')}
              </h3>
            </div>
            <div className="ml-4 flex-col">
              <h3 className="text-xl font-semibold">Sunset</h3>
              <h3 className="text-lg ">
                {' '}
                {moment.unix(weather.sunset).tz(timezone).format('LT')}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center align-middle">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"
            height={'100'}
            width={'100'}
            className=" object-cover"
          />
          <h3 className="text-2xl  font-semibold">
            {weather.weather[0].description}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default TodaysWeather
