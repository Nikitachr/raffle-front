import { useCallback, useState } from 'react'
import { useInterval } from '@hooks/interval'

export const useCountdown = (seconds: number, initSeconds?: number): [number, () => void] => {
  const [timeLeft, setTimeLeft] = useState(initSeconds != null ? initSeconds : seconds)

  const resetCountdown = useCallback(() => {
    setTimeLeft(seconds)
  }, [seconds])

  useInterval(() => {
    if (!timeLeft) return

    setTimeLeft(timeLeft - 1)
  }, 1000)

  return [timeLeft, resetCountdown]
}
