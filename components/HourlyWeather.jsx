import moment from 'moment-timezone'
import Image from 'next/image'
import React from 'react'

const HourlyWeather = ({ weather, timezone }) => {
  return (
    <div className="container mx-auto mt-4 rounded-lg  py-6   text-white lg:w-3/4">
      <div className="flex w-full overflow-x-scroll">
        {weather.length > 0 &&
          weather.map((weather, index) => (
            <div
              className={`${
                index === 0 ? 'mx-0' : 'mx-4'
              }  flex-col justify-between rounded-lg bg-blue-900 px-8 py-6  text-center`}
            >
              <span className="text-md ">
                {index === 0
                  ? 'Now'
                  : moment.unix(weather.dt).tz(timezone).format('LT')}
              </span>
              <div>
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  width="100"
                  height="100"
                  alt="Weather logo"
                  className="object-cover"
                />
              </div>
              <h3 className="content-end">{weather.temp.toFixed(0)}&deg;C</h3>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HourlyWeather
