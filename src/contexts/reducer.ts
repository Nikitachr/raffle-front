import { ERaffleActionType, RaffleReducer } from '@contexts/types'
import produce from 'immer'

export const raffleReducer: RaffleReducer = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ERaffleActionType.FETCH_DEPOSITED_BALANCE:
        draft.pendingDepositedBalance = true
        break
      case ERaffleActionType.FETCH_ENTRY_FEE:
        draft.pendingEntryFee = true
        break
      case ERaffleActionType.FETCH_OWNER:
        draft.pendingOwner = true
        break
      case ERaffleActionType.FETCH_RAFFLE_STATE:
        draft.pendingRaffleState = true
        break
      case ERaffleActionType.FETCH_TOTAL_BALANCE:
        draft.pendingTotalBalance = true
        break
      case ERaffleActionType.FETCH_TOTAL_PLAYERS:
        draft.pendingTotalPlayers = true
        break
      case ERaffleActionType.SET_DEPOSITED_BALANCE:
        draft.pendingDepositedBalance = false
        draft.depositedBalance = action.payload
        break
      case ERaffleActionType.SET_ENTRY_FEE:
        draft.pendingEntryFee = false
        draft.entryFee = action.payload
        break
      case ERaffleActionType.SET_OWNER:
        draft.pendingOwner = false
        draft.isOwner = action.payload
        break
      case ERaffleActionType.SET_RAFFLE_STATE:
        draft.pendingRaffleState = false
        draft.raffleState = action.payload
        break
      case ERaffleActionType.SET_TOTAL_BALANCE:
        draft.pendingTotalBalance = false
        draft.totalBalance = action.payload
        break
      case ERaffleActionType.SET_TOTAL_PLAYERS:
        draft.pendingTotalPlayers = false
        draft.totalPlayers = action.payload
        break
      case ERaffleActionType.FETCH_TIME_LEFT:
        draft.pendingTimeLeft = true
        break
      case ERaffleActionType.SET_TIME_LEFT:
        draft.pendingTimeLeft = false
        draft.timeLeft = action.payload
        break
      case ERaffleActionType.FETCH_HISTORY:
        draft.pendingHistory = true
        break
      case ERaffleActionType.SET_HISTORY:
        draft.pendingHistory = false
        draft.history = action.payload
        break
      default:
        break
    }
  })
