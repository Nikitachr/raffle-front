import React, { createContext, FC, PropsWithChildren, useCallback, useEffect, useReducer, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { useRaffleContract } from '@hooks/raffleContract'
import { ERaffleActionType, ERaffleState, IRaffleState } from '@contexts/types'
import { raffleReducer } from '@contexts/reducer'
import {
  fetchDepositedBalanceAction,
  fetchEntryFeeAction,
  fetchHistoryAction,
  fetchOwnerAction,
  fetchRaffleStateAction,
  fetchTimeLeftAction,
  fetchTotalBalanceAction,
  fetchTotalPlayersAction,
} from '@contexts/actions'
import { useRaffleEvents } from '@hooks/raffleEvents'
import Moralis from 'moralis'
import { useNotification } from 'web3uikit'
import { MUMBAI_ID } from '@constants/index'

type RaffleContextActions = {
  startNewGame: () => void
  toggleModal: () => void
  toggleRulesModal: () => void
}

const initialState: IRaffleState = {
  pendingOwner: true,
  pendingDepositedBalance: true,
  pendingRaffleState: true,
  pendingEntryFee: true,
  pendingTotalBalance: true,
  pendingTotalPlayers: true,
  pendingTimeLeft: true,
  pendingHistory: true,
}

type RaffleContextData = IRaffleState & { isModalOpen: boolean; isRulesModalOpen: boolean }

export const raffleContext = createContext<RaffleContextData & RaffleContextActions>(null as any)

export const RaffleContextProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const { chainId, switchNetwork } = useChain()
  const { enableWeb3, isWeb3Enabled, user, isAuthenticated, isWeb3EnableLoading, logout } = useMoralis()
  const [state, dispatch] = useReducer(raffleReducer, initialState)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)

  const addNotification = useNotification()

  const toggleModal = useCallback(() => setIsModalOpen((s) => !s), [setIsModalOpen])
  const toggleRulesModal = useCallback(() => setIsRulesModalOpen((s) => !s), [setIsRulesModalOpen])

  useEffect(() => {
    const unsubscribe = Moralis.onAccountChanged(() => {
      logout()
    })
    return () => {
      unsubscribe()
    }
  }, [dispatch, logout])

  useEffect(() => {
    if (chainId !== MUMBAI_ID && isWeb3Enabled) {
      switchNetwork(MUMBAI_ID)
    }
  }, [chainId, isWeb3Enabled, switchNetwork])

  useRaffleEvents('GameStarted', () => {
    dispatch({ type: ERaffleActionType.SET_RAFFLE_STATE, payload: ERaffleState.OPEN })
    addNotification({ type: 'info', position: 'topR', message: 'Game is started' })
  })

  useRaffleEvents('GameEnded', (_, winner, amount) => {
    dispatch({ type: ERaffleActionType.SET_RAFFLE_STATE, payload: ERaffleState.CLOSED })
    if (winner.toLowerCase() === user?.attributes.ethAddress?.toLowerCase()) {
      addNotification({
        type: 'success',
        position: 'topR',
        message: `Congratulations, you've won ${Moralis.Units.FromWei(amount)} MATIC`,
      })
      return
    }
    addNotification({ type: 'info', position: 'topR', message: `Game is ended, winner is ${winner}` })
  })

  useRaffleEvents('GameCalculating', () => {
    dispatch({ type: ERaffleActionType.SET_RAFFLE_STATE, payload: ERaffleState.CALCULATING })
  })

  useRaffleEvents('PlayerJoined', (address, totalPlayers) => {
    dispatch({ type: ERaffleActionType.SET_TOTAL_PLAYERS, payload: Moralis.Units.FromWei(totalPlayers, 0) })
    if (address.toLowerCase() !== user?.attributes.ethAddress?.toLowerCase()) {
      addNotification({ type: 'info', position: 'topR', message: `${address} joined the game` })
    }
  })

  useRaffleEvents('PlayerAddedBalance', (_, address, addedBalance, currentBalance, totalBalance) => {
    dispatch({ type: ERaffleActionType.SET_TOTAL_BALANCE, payload: Moralis.Units.FromWei(totalBalance) })
    if (address.toLowerCase() === user?.attributes.ethAddress.toLowerCase()) {
      dispatch({ type: ERaffleActionType.SET_DEPOSITED_BALANCE, payload: Moralis.Units.FromWei(currentBalance) })
      addNotification({
        type: 'success',
        position: 'topR',
        message: `You successfully deposited ${Moralis.Units.FromWei(addedBalance)} MATIC`,
      })
      return
    }
    addNotification({
      type: 'info',
      position: 'topR',
      message: `${address} deposited ${Moralis.Units.FromWei(addedBalance)} MATIC`,
    })
  })

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId')
    if (!isWeb3Enabled && !isWeb3EnableLoading) {
      // @ts-ignore
      enableWeb3({ provider: connectorId, chainId: MUMBAI_ID })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled])

  const { runContractFunction: fetchOwner } = useRaffleContract({
    functionName: 'owner',
  })
  const { runContractFunction: fetchRaffleState } = useRaffleContract({
    functionName: 'getRaffleState',
  })
  const { runContractFunction: fetchStartNewGame } = useRaffleContract({
    functionName: 'startNewGame',
  })
  const { runContractFunction: fetchTotalBalance } = useRaffleContract({
    functionName: 'getTotalBalance',
  })
  const { runContractFunction: fetchDepositedBalance } = useRaffleContract({
    functionName: 'getDepositedBalance',
  })
  const { runContractFunction: fetchTotalPlayers } = useRaffleContract({
    functionName: 'getTotalPlayers',
  })
  const { runContractFunction: fetchEntryFee } = useRaffleContract({
    functionName: 'getEntryFee',
  })
  const { runContractFunction: fetchTimeLeft } = useRaffleContract({
    functionName: 'getLastTimeStamp',
  })

  const startNewGame = useCallback(() => fetchStartNewGame(), [fetchStartNewGame])

  useEffect(() => {
    fetchHistoryAction(dispatch)
  }, [dispatch])

  useEffect(() => {
    if (!isWeb3Enabled) return
    fetchRaffleStateAction(dispatch, fetchRaffleState)
  }, [dispatch, fetchRaffleState, isWeb3Enabled])

  useEffect(() => {
    if (!isWeb3Enabled || !user?.attributes.ethAddress) return
    fetchOwnerAction(dispatch, fetchOwner, user.attributes.ethAddress)
  }, [dispatch, fetchOwner, isWeb3Enabled, user?.attributes.ethAddress])

  useEffect(() => {
    if (state.raffleState !== ERaffleState.OPEN) return
    fetchTotalBalanceAction(dispatch, fetchTotalBalance)
    fetchDepositedBalanceAction(dispatch, fetchDepositedBalance)
    fetchTotalPlayersAction(dispatch, fetchTotalPlayers)
    fetchEntryFeeAction(dispatch, fetchEntryFee)
  }, [dispatch, fetchDepositedBalance, fetchEntryFee, fetchTotalBalance, fetchTotalPlayers, state.raffleState])

  useEffect(() => {
    if (!state.totalPlayers || +state.totalPlayers < 2) return
    fetchTimeLeftAction(dispatch, fetchTimeLeft)
  }, [fetchTimeLeft, state.totalPlayers])

  return (
    <raffleContext.Provider
      value={{ ...state, startNewGame, isModalOpen, toggleModal, isRulesModalOpen, toggleRulesModal }}
    >
      {children}
    </raffleContext.Provider>
  )
}
