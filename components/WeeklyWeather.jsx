import moment from 'moment-timezone'
import Image from 'next/image'
import React from 'react'

const WeeklyWeather = ({ weather, timezone }) => {
  console.log(weather)
  return (
    <div className="container mx-auto  mt-8  text-white lg:w-3/4">
      <h1 className="py-4 text-3xl font-semibold text-black">
        Weakly <span className="text-gray-500">Weather</span>
      </h1>
      {weather.length > 0 &&
        weather.map((weather, index) => {
          if (weather.index == 0) {
            return
          }
          return (
            <div className="my-2 block w-full rounded-lg bg-blue-400 px-2 lg:px-8">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="flex-col">
                    <h3 className="py-2 text-2xl font-semibold">
                      {' '}
                      {moment.unix(weather.dt).tz(timezone).format('dddd')}
                    </h3>
                    <h3 className="py-2 text-xl font-semibold italic">
                      <span> {weather.temp.max.toFixed(0)}&deg;C</span>
                      <span className="ml-2 text-gray-300">
                        {' '}
                        {weather.temp.min.toFixed(0)}&deg;C
                      </span>
                    </h3>
                  </div>
                  <div className="ml-8 flex py-2">
                    <div className="flex-col py-2">
                      <h3 className="text-xl font-semibold">Sunrise</h3>
                      <h3 className="py-4 text-lg ">
                        {' '}
                        {moment.unix(weather.sunrise).tz(timezone).format('LT')}
                      </h3>
                    </div>
                    <div className="ml-4 flex-col py-2">
                      <h3 className=" text-xl font-semibold">Sunset</h3>
                      <h3 className="py-4 text-lg ">
                        {' '}
                        {moment.unix(weather.sunset).tz(timezone).format('LT')}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex-col content-start align-middle">
                  <div>
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      height={'70'}
                      width={'70'}
                      className=" object-cover"
                    />
                  </div>
                  <h3 className="font-bold">
                    {weather.weather[0].description}
                  </h3>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default WeeklyWeather
