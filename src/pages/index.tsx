import React, { useCallback, useContext } from 'react'
import { NextPage } from 'next'
import { Header } from '@components/Header'
import { raffleContext } from '@contexts/raffle'
import { RaffleWidget } from '@components/RaffleWidget'
import { useRaffleContract } from '@hooks/raffleContract'
import { ERaffleState } from '@contexts/types'
import { DepositModal } from '@components/DepositModal'
import { Rules } from '@components/Rules'
import { RulesModal } from '@components/RulesModal'
import { HistoryWidget } from '@components/HistoryWidget'

const Home: NextPage = () => {
  const { isOwner, pendingRaffleState, raffleState, isModalOpen, isRulesModalOpen, history } = useContext(raffleContext)

  const { runContractFunction } = useRaffleContract({ functionName: 'startNewGame' })
  const { runContractFunction: withdraw } = useRaffleContract({ functionName: 'withdraw' })

  const startNewGame = useCallback(async () => {
    await runContractFunction()
  }, [runContractFunction])

  return (
    <div>
      <Header />
      <div className="flex items-center flex-col">
        <div className="p-8 w-full max-w-xl grid gap-5">
          {isOwner && !pendingRaffleState && raffleState === ERaffleState.CLOSED && (
            <div className="flex justify-between">
              <button className="button !px-6 font-bold" type="button" onClick={() => withdraw()}>
                Withdraw
              </button>
              <button className="button !px-6 font-bold" type="button" onClick={startNewGame}>
                Start new raffle
              </button>
            </div>
          )}
          <RaffleWidget />
          <HistoryWidget history={history} />
          {isModalOpen && <DepositModal />}
          {isRulesModalOpen && <RulesModal />}
        </div>
      </div>
      <Rules />
    </div>
  )
}

export default Home
