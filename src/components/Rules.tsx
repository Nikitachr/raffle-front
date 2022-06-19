import React, { useContext } from 'react'
import RulesIcon from 'src/assets/rules.svg'
import { raffleContext } from '@contexts/raffle'

export const Rules = () => {
  const { toggleRulesModal } = useContext(raffleContext)

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={toggleRulesModal} className="fixed bottom-8 right-8 transform scale-150 cursor-pointer">
      <RulesIcon />
    </div>
  )
}
