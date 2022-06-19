import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useNotification } from 'web3uikit'
import { useNativeBalance } from 'react-moralis'
import Moralis from 'moralis'
import { raffleContext } from '@contexts/raffle'
import { useRaffleContract } from '@hooks/raffleContract'
import useOnClickOutside from '@hooks/clickOutside'
import CloseIcon from 'src/assets/close.svg'

export const DepositModal = () => {
  const { getBalances, data: balance } = useNativeBalance()
  const { entryFee, toggleModal } = useContext(raffleContext)
  const [amount, setAmount] = useState<string>()
  const dispatch = useNotification()
  const ref = useRef(null)
  useOnClickOutside(ref, toggleModal)

  const { runContractFunction: addBalance } = useRaffleContract({
    functionName: 'addBalance',
  })

  useEffect(() => {
    getBalances()
  }, [getBalances])

  const deposit = useCallback(async () => {
    if (!balance.balance || !amount || !entryFee) return
    if (
      +Moralis.Units.ETH(amount || 0) >= +balance.balance ||
      +Moralis.Units.ETH(amount || 0) <= +Moralis.Units.ETH(entryFee)
    ) {
      dispatch({ message: 'Amount is less than fee or bigger than your balance', type: 'error', position: 'topR' })
      return
    }
    await addBalance({
      params: { msgValue: Moralis.Units.ETH(amount.toString()) },
      onSuccess: () => {
        toggleModal()
        dispatch({ message: 'Transaction is pending', type: 'info', position: 'topR' })
      },
      onError: (e) => {
        console.log(e)
        dispatch({ message: 'Something went wrong', type: 'error', position: 'topR' })
      },
    })
  }, [addBalance, amount, balance.balance, dispatch, entryFee, toggleModal])

  return (
    <div className="w-full z-10 h-full fixed left-0 top-0 flex items-center justify-center bg-black bg-opacity-70 text-white">
      <div ref={ref} className="glass rounded-3xl grid gap-7 p-4 w-full max-w-md relative">
        <button type="button" onClick={toggleModal} className="absolute right-4 top-4 cursor-pointer">
          <CloseIcon />
        </button>
        <h2 className="text-center font-black text-2xl">Deposit</h2>
        <div>
          <p className="mb-2">Amount</p>
          <input
            type="number"
            className="w-full bg-transparent rounded-2xl px-2 py-1 border-white border-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-sm">Current balance {balance.formatted}, fee is 0.1 MATIC</p>
        </div>
        <button className="button font-semibold" type="button" onClick={deposit}>
          DEPOSIT
        </button>
      </div>
    </div>
  )
}
