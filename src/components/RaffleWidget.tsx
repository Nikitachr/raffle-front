import React, { useContext, useRef, useState } from 'react'
import { raffleContext } from '@contexts/raffle'
import { Skeleton, WalletModal } from 'web3uikit'
import { ERaffleState } from '@contexts/types'
import { Timer } from '@components/Timer'
import { useMoralis } from 'react-moralis'
import { Users } from '@components/Users'
import { Chart } from '@components/Chart'
import useEventListener from '@hooks/eventListener'
import { Loader } from '@components/Loader'

const InfoBlock = ({ info, label }: { label: string; info?: string }) => (
  <p className="text-center">
    <span className="font-semibold text-lg">{label}</span>
    <br />
    {info ? <span>{info} MATIC</span> : <Skeleton theme="text" height="24px" width="48px" />}
  </p>
)

export const RaffleWidget = () => {
  const { isAuthenticated } = useMoralis()
  const { raffleState, pendingRaffleState, totalBalance, depositedBalance, timeLeft, toggleModal } =
    useContext(raffleContext)

  const ref = useRef<HTMLDivElement>(null)
  useEventListener(
    'mousemove',
    (e) => {
      if (!ref.current) return
      const followX = window.innerWidth / 2 - (e as MouseEvent).clientX
      const followY = window.innerHeight / 2 - (e as MouseEvent).clientY
      let x = 0
      let y = 0
      x += (-followX - x) * (1 / 32)
      y += (followY - y) * (1 / 32)
      // @ts-ignore
      ref.current.style = `transform: rotateY(${x}deg) rotateX(${y}deg) perspective(600px)`
    },
    // @ts-ignore
    'document',
  )

  const [isOpenedModal, setIsOpenedModal] = useState(false)

  if (pendingRaffleState) {
    return <Skeleton theme="image" width="100%" borderRadius="20px" height="256px" />
  }

  if (raffleState === ERaffleState.CALCULATING) {
    return (
      <div ref={ref} className="w-full p-12 flex justify-center rounded-2xl border border-secondaryBlack glass">
        <Loader />
      </div>
    )
  }

  return (
    <div ref={ref} className="w-full p-4 rounded-2xl border border-secondaryBlack text-white glass">
      {raffleState === ERaffleState.CLOSED ? (
        <h1 className="text-center">Raffle is not started</h1>
      ) : (
        <div className="flex flex-col items-center gap-4 relative">
          <Users className="absolute left-0 top-0" />
          <div className="absolute right-0 top-0 w-1/2 text-right text-white">
            {timeLeft ? (
              <Timer timeLeft={timeLeft} />
            ) : (
              <span>It should be at least two players to start countdown</span>
            )}
          </div>
          {!!totalBalance && <Chart totalBalance={Number(totalBalance)} depositedBalance={Number(depositedBalance)} />}
          <InfoBlock label="Total balance" info={totalBalance?.toString()} />
          {depositedBalance && <InfoBlock label="Your deposit" info={depositedBalance.toString()} />}
          {isAuthenticated ? (
            <button type="button" className="button w-full text-lg font-black space-x-2" onClick={toggleModal}>
              DEPOSIT
            </button>
          ) : (
            <button
              type="button"
              className="button w-full text-lg font-black space-x-2"
              onClick={() => setIsOpenedModal(true)}
            >
              AUTHORIZE
            </button>
          )}
        </div>
      )}
      <WalletModal moralisAuth isOpened={isOpenedModal} setIsOpened={setIsOpenedModal} />
    </div>
  )
}
