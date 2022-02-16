import React from 'react'
import lahore from '../public/lahore1.jpg'
import karachi from '../public/karachi.jpg'
import sialkot from '../public/sialkot.jpg'
import islamabad from '../public/islamabad.jpeg'
import Link from 'next/link'
import Image from 'next/image'

const famousPlaces = [
  {
    name: 'Lahore',
    image: lahore,
    url: '/location/lahore-1172451',
  },
  {
    name: 'Sialkot',
    image: sialkot,
    url: '/location/sialkot-1164909',
  },
  {
    name: 'Karachi',
    image: karachi,
    url: '/location/karachi-1174872',
  },
  {
    name: 'Islamabad',
    image: islamabad,
    url: '/location/islamabad-1162015',
  },
]

const FamousPlaces = () => {
  return (
    <div className="container mx-auto mt-6 lg:mt-4 lg:w-3/4">
      <div className="grid grid-cols-4 gap-8">
        {famousPlaces.map((place, index) => (
          <Link href={place.url} key={index}>
            <a>
              <div>
                <Image
                  src={place.image}
                  alt={place.name}
                  height={250}
                  width={200}
                  className="overflow-hidden rounded-lg object-cover "
                />
              </div>
              <span className="text-lg font-semibold">{place.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FamousPlaces
