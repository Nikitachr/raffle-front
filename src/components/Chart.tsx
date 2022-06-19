import React, { FC, useMemo } from 'react'
import { PieChart } from 'react-minimal-pie-chart'

type ChartProps = {
  totalBalance: number
  depositedBalance?: number
}

export const Chart: FC<ChartProps> = ({ totalBalance, depositedBalance }) => {
  const chance = useMemo(() => ((depositedBalance || 1) * 100) / (totalBalance || 1), [depositedBalance, totalBalance])

  return (
    <div className="flex flex-col items-center mb-20">
      <PieChart
        background="rgba(255, 255, 255, 0.2)"
        radius={30}
        lineWidth={16}
        segmentsStyle={(_) => ({ filter: 'drop-shadow(0px 0px 5px rgba(14, 233, 141,0.8))' })}
        totalValue={totalBalance}
        startAngle={-90}
        rounded
        data={[{ value: depositedBalance || 0, color: '#0EE98D' }]}
      />
      <p className="-mt-44 text-center">
        {depositedBalance ? (
          <>
            <span className="font-semibold text-gray-300">Your chance</span>
            <br />
            <span className="font-black text-2xl text-cyan-500">{chance.toFixed(2)}%</span>
          </>
        ) : (
          <span className="font-black text-2xl text-cyan-500">{totalBalance}</span>
        )}
      </p>
    </div>
  )
}
