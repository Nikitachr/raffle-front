import React, { useCallback, useContext } from 'react'
import { useChain } from 'react-moralis'
import { MUMBAI_ID } from '@constants/index'
import { raffleContext } from '@contexts/raffle'

export const ChainModal = () => {
  const { toggleChainModal } = useContext(raffleContext)
  const { switchNetwork } = useChain()

  const changeChain = useCallback(async () => {
    await switchNetwork(MUMBAI_ID)
    toggleChainModal()
  }, [switchNetwork, toggleChainModal])

  return (
    <div className="w-full z-10 h-full fixed left-0 top-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
      <div className="p-4 max-w-md">Raffle game is available only on Mumbai Testnet</div>
      <button type="button" onClick={changeChain} className="button">
        Switch network
      </button>
    </div>
  )
}
