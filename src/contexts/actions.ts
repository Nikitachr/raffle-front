import { DispatchAction, DispatchContractAction, ERaffleActionType, ERaffleState, RaffleActions } from '@contexts/types'
import Moralis from 'moralis'
import { subgraphQuery } from '@utils/index'
import { FETCH_WINNERS_HISTORY } from 'src/queris'

type DispatchActionRaffle<T> = DispatchAction<RaffleActions, T>
type DispatchContractActionRaffle<T> = DispatchContractAction<RaffleActions, T>

export const fetchRaffleStateAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_RAFFLE_STATE })
  try {
    const state = await fetch()
    dispatch({ type: ERaffleActionType.SET_RAFFLE_STATE, payload: state as ERaffleState })
  } catch (e) {
    console.error(e)
  }
}

export const fetchOwnerAction: DispatchContractActionRaffle<string> = async (dispatch, fetch, user) => {
  dispatch({ type: ERaffleActionType.FETCH_OWNER })
  try {
    const owner = (await fetch()) as string
    const isOwner = owner.toLowerCase() === user.toLowerCase()
    dispatch({ type: ERaffleActionType.SET_OWNER, payload: isOwner })
  } catch (e) {
    console.error('fetch owner', e)
  }
}

export const fetchTotalBalanceAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_TOTAL_BALANCE })
  try {
    const totalBalance = (await fetch()) as string
    dispatch({ type: ERaffleActionType.SET_TOTAL_BALANCE, payload: Moralis.Units.FromWei(totalBalance) })
  } catch (e) {
    console.error('fetch total balance', e)
  }
}

export const fetchDepositedBalanceAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_DEPOSITED_BALANCE })
  try {
    const depositedBalance = (await fetch()) as string
    dispatch({ type: ERaffleActionType.SET_DEPOSITED_BALANCE, payload: Moralis.Units.FromWei(depositedBalance) })
  } catch (e) {
    console.error('fetch deposited balance', e)
  }
}

export const fetchTotalPlayersAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_TOTAL_PLAYERS })
  try {
    const totalPlayers = (await fetch()) as string
    dispatch({ type: ERaffleActionType.SET_TOTAL_PLAYERS, payload: Moralis.Units.FromWei(totalPlayers, 0) })
  } catch (e) {
    console.error('fetch total players', e)
  }
}

export const fetchEntryFeeAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_ENTRY_FEE })
  try {
    const entryFee = (await fetch()) as string
    dispatch({ type: ERaffleActionType.SET_ENTRY_FEE, payload: Moralis.Units.FromWei(entryFee) })
  } catch (e) {
    console.error('fetch entry fee', e)
  }
}

export const fetchTimeLeftAction: DispatchContractActionRaffle<void> = async (dispatch, fetch) => {
  dispatch({ type: ERaffleActionType.FETCH_TIME_LEFT })
  try {
    const timeLeft = (await fetch()) as string
    dispatch({ type: ERaffleActionType.SET_TIME_LEFT, payload: +Moralis.Units.FromWei(timeLeft, 0) })
  } catch (e) {
    console.error('fetch time left', e)
  }
}

export const fetchHistoryAction: DispatchActionRaffle<void> = async (dispatch) => {
  dispatch({ type: ERaffleActionType.FETCH_HISTORY })
  try {
    const history = await subgraphQuery(FETCH_WINNERS_HISTORY)
    dispatch({ type: ERaffleActionType.SET_HISTORY, payload: history.userHistories })
  } catch (e) {
    console.error('fetch history', e)
  }
}
