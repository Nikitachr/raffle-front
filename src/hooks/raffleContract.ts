import { useWeb3Contract, Web3ExecuteFunctionParameters } from 'react-moralis'
import { address } from '@constants/index'
import abi from '@constants/abi.json'

export const useRaffleContract = (props: Omit<Web3ExecuteFunctionParameters, 'contractAddress' | 'abi'>) => {
  return useWeb3Contract({
    contractAddress: address,
    abi,
    ...props,
  })
}
