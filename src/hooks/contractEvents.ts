import { useEffect } from 'react'

import { ContractInterface } from 'ethers'

import { useContract } from './contract'

type TContractEvents = (
  contractOptions: { address: string; abi: ContractInterface },
  eventName: string,
  listener: (address: string, response: any, ...args: Array<any>) => void,
) => void

export const useContractEvents: TContractEvents = ({ address, abi }, eventName, listener) => {
  const contract = useContract(address, abi)

  useEffect(() => {
    contract?.off(eventName, listener)
    try {
      contract?.on(eventName, listener)
    } catch (e) {
      return
    }
    return () => {
      contract?.off(eventName, listener)
    }
  }, [contract])
}
