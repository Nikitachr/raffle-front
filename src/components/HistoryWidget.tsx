import React, { FC } from 'react'
import Moralis from 'moralis'
import { Loader } from '@components/Loader'

export type History = {
  player: string
  amount: string
}

export const HistoryWidget: FC<{ history?: History[] }> = ({ history }) => {
  return (
    <div className=" p-4 flex items-center flex-col text-white glass gap-4">
      <h3 className="font-black text-lg">Winners history</h3>
      {history ? (
        history.map(({ player, amount }) => (
          <div className="flex items-center justify-between w-full">
            <span>{player}</span>
            <span>{Moralis.Units.FromWei(amount)} MATIC</span>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  )
}
