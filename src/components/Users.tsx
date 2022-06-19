import React, { useContext } from 'react'
import UsersIcon from 'src/assets/users.svg'
import { raffleContext } from '@contexts/raffle'
import { Skeleton } from 'web3uikit'

export const Users = ({ className }: { className: string }) => {
  const { totalPlayers, pendingTotalPlayers } = useContext(raffleContext)
  return (
    <div className={`${className} fill-white flex items-center gap-2`}>
      <UsersIcon />
      {pendingTotalPlayers ? (
        <Skeleton theme="text" height="18px" width="18px" />
      ) : (
        <span className="text-lg">{totalPlayers}</span>
      )}
    </div>
  )
}
