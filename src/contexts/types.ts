import { useWeb3Contract } from 'react-moralis'
import { History } from '@components/HistoryWidget'

export type DispatchAction<D, T> = (dispatch: React.Dispatch<D>, params: T) => Promise<void>
export type DispatchContractAction<D, T> = (
  dispatch: React.Dispatch<D>,
  func: ReturnType<typeof useWeb3Contract>['runContractFunction'],
  params: T,
) => Promise<void>

export enum ERaffleState {
  OPEN,
  CALCULATING,
  CLOSED,
}

export interface IRaffleState {
  pendingOwner: boolean
  raffleState?: ERaffleState
  pendingRaffleState: boolean
  isOwner?: boolean
  totalBalance?: string
  pendingTotalBalance: boolean
  depositedBalance?: string
  pendingDepositedBalance: boolean
  totalPlayers?: string
  pendingTotalPlayers: boolean
  entryFee?: string
  pendingEntryFee: boolean
  pendingTimeLeft: boolean
  timeLeft?: number
  userAddress?: string
  history?: History[]
  pendingHistory: boolean
}

export enum ERaffleActionType {
  FETCH_OWNER,
  SET_OWNER,
  FETCH_RAFFLE_STATE,
  SET_RAFFLE_STATE,
  FETCH_TOTAL_BALANCE,
  SET_TOTAL_BALANCE,
  FETCH_DEPOSITED_BALANCE,
  SET_DEPOSITED_BALANCE,
  FETCH_TOTAL_PLAYERS,
  SET_TOTAL_PLAYERS,
  FETCH_ENTRY_FEE,
  SET_ENTRY_FEE,
  FETCH_TIME_LEFT,
  SET_TIME_LEFT,
  FETCH_HISTORY,
  SET_HISTORY,
}

type Action<T> = { type: T }
type ActionWithPayload<T, V> = Action<T> & { payload: V }

type FetchOwnerAction = Action<ERaffleActionType.FETCH_OWNER>
type SetOwnerAction = ActionWithPayload<ERaffleActionType.SET_OWNER, boolean>
type FetchRaffleStateAction = Action<ERaffleActionType.FETCH_RAFFLE_STATE>
type SetRaffleStateAction = ActionWithPayload<ERaffleActionType.SET_RAFFLE_STATE, ERaffleState>
type FetchTotalBalanceAction = Action<ERaffleActionType.FETCH_TOTAL_BALANCE>
type SetTotalBalanceAction = ActionWithPayload<ERaffleActionType.SET_TOTAL_BALANCE, string>
type FetchDepositedBalanceAction = Action<ERaffleActionType.FETCH_DEPOSITED_BALANCE>
type SetDepositedBalanceAction = ActionWithPayload<ERaffleActionType.SET_DEPOSITED_BALANCE, string>
type FetchTotalPlayersAction = Action<ERaffleActionType.FETCH_TOTAL_PLAYERS>
type SetTotalPlayersAction = ActionWithPayload<ERaffleActionType.SET_TOTAL_PLAYERS, string>
type FetchEntryFeeAction = Action<ERaffleActionType.FETCH_ENTRY_FEE>
type SetEntryFeeAction = ActionWithPayload<ERaffleActionType.SET_ENTRY_FEE, string>
type FetchTimeLeftAction = Action<ERaffleActionType.FETCH_TIME_LEFT>
type SetTimeLeftAction = ActionWithPayload<ERaffleActionType.SET_TIME_LEFT, number>
type FetchHistoryAction = Action<ERaffleActionType.FETCH_HISTORY>
type SetHistoryAction = ActionWithPayload<ERaffleActionType.SET_HISTORY, History[]>

export type RaffleActions =
  | FetchOwnerAction
  | SetOwnerAction
  | FetchRaffleStateAction
  | SetRaffleStateAction
  | FetchTotalBalanceAction
  | SetTotalBalanceAction
  | FetchDepositedBalanceAction
  | SetDepositedBalanceAction
  | FetchTotalPlayersAction
  | SetTotalPlayersAction
  | FetchEntryFeeAction
  | SetEntryFeeAction
  | FetchTimeLeftAction
  | SetTimeLeftAction
  | FetchHistoryAction
  | SetHistoryAction

export type RaffleReducer = (state: IRaffleState, action: RaffleActions) => IRaffleState
