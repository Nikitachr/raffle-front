import React, { useContext, useRef } from 'react'
import CloseIcon from 'src/assets/close.svg'
import { raffleContext } from '@contexts/raffle'
import useOnClickOutside from '@hooks/clickOutside'

export const RulesModal = () => {
  const { toggleRulesModal } = useContext(raffleContext)
  const ref = useRef(null)
  useOnClickOutside(ref, toggleRulesModal)
  return (
    <div className="w-full z-10 h-full fixed left-0 top-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
      <div ref={ref} className="glass rounded-3xl grid gap-7 p-4 w-full max-w-md relative">
        <button type="button" onClick={toggleRulesModal} className="absolute right-4 top-4 cursor-pointer">
          <CloseIcon />
        </button>
        <h2 className="text-center font-black text-2xl">Rules</h2>
        <p>
          It's raffle game, users adds liquidity to pool, after two players add liquidity, the countdown starts, when
          time runs out, a winner is chosen, the chance of winning depends on your part of the pool, fee is{' '}
          <strong>0.1 MATIC</strong> from every deposit
        </p>
      </div>
    </div>
  )
}
