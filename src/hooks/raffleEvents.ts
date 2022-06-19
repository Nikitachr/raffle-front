import { useContractEvents } from '@hooks/contractEvents'
import { address } from '@constants/index'
import abi from '@constants/abi.json'

type RaffleEvents = (eventName: string, listener: (...args: Array<any>) => void) => void

export const useRaffleEvents: RaffleEvents = (eventName, listener) => {
  useContractEvents({ address, abi }, eventName, listener)
}
