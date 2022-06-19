import React, { useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api, useNativeBalance } from 'react-moralis'
import { getEllipsisTxt } from '@utils/index'
import { Blockie } from 'web3uikit'
import { MUMBAI_ID } from '@constants/index'

export const Connect = () => {
  const { isAuthenticated, user, authenticate } = useMoralis()
  const { getBalances, data: balance } = useNativeBalance()

  useEffect(() => {
    getBalances()
  }, [user, getBalances])

  if (!isAuthenticated) {
    return (
      <button type="button" className="button !px-6 !py-2" onClick={() => authenticate({ chainId: MUMBAI_ID })}>
        Connect wallet
      </button>
    )
  }

  return (
    <div className="p-1 rounded-3xl flex items-center gap-1 border border-white filter drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]">
      <span className="text-white px-1">{balance.formatted}</span>
      <div className="rounded-3xl bg-white p-1 font-semibold flex gap-1.5 items-center">
        <span className="ml-1.5">{getEllipsisTxt(user?.attributes.ethAddress)}</span>
        <Blockie size={6} seed={user?.attributes.ethAddress} />
      </div>
    </div>
  )
}
