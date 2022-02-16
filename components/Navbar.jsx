import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/logo.png'

const Navbar = () => {
  return (
    <div className="h-50   flex w-full justify-between border-b border-gray-300 py-4 px-8 align-middle">
      <h3 className="  inline-block cursor-pointer align-middle text-3xl font-bold italic text-blue-700">
        WeatherApp
      </h3>

      <Link href="/">
        <span className=" inline-block cursor-pointer rounded-lg bg-blue-500 px-4 py-2  text-center align-middle align-middle text-lg text-white">
          Github Repository
        </span>
      </Link>
    </div>
  )
}

export default Navbar
