import React, { useContext } from 'react'
import RulesIcon from 'src/assets/rules.svg'
import { raffleContext } from '@contexts/raffle'

export const Rules = () => {
  const { toggleRulesModal } = useContext(raffleContext)

  return (
    <div onClick={toggleRulesModal} className="fixed bottom-8 right-8 transform scale-150 cursor-pointer">
      <RulesIcon />
    </div>
  )
}
