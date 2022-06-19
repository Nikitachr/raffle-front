import { useEffect, useState } from 'react'

import { Contract, ContractInterface } from 'ethers'
import { useMoralis } from 'react-moralis'

export const useContract = (address: string, abi: ContractInterface): Contract | undefined => {
  const [contract, setContract] = useState<Contract>()
  const { Moralis } = useMoralis()

  useEffect(() => {
    setContract(new Contract(address, abi, Moralis.web3?.getSigner()))
  }, [Moralis.web3])

  return contract
}
