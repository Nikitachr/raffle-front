import React from 'react'
import { Connect } from '@components/Connect'

export const Header = () => {
  return (
    <div className="header px-5 w-full py-3 flex flex-row">
      <h1 className="pl-4 font-bold text-2xl text-white">Raffle</h1>
      <div className="ml-auto pr-4">
        <Connect />
      </div>
    </div>
  )
}
