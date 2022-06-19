import React from 'react'
import { useCountdown } from '@hooks/countdown'

export const Timer = ({ timeLeft }: { timeLeft: number }) => {
  const [countdown] = useCountdown(0, timeLeft)
  const [minutes, seconds] = [Math.floor((countdown % 3600) / 60), Math.floor(countdown % 60)].map((part) =>
    part < 10 ? `0${part}` : `${part}`,
  )

  return (
    <div>
      {minutes}:{seconds}
    </div>
  )
}
