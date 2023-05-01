import React from 'react'
import { NextPage } from 'next'
import { getTransactions } from '@components/utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction } from '../../../app/types'
import BarGraphicVertical from '../graphics/BarGraphicVertical'

const BalanceCurrentMont: NextPage = () => {

  const {
    data: transactions,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const mesActual = (fecha.getMonth() + 1 > 9 ? (fecha.getMonth() + 1) : `0${fecha.getMonth() + 1}`);
  const añoActual = fecha.getFullYear();
  
  const getAmountByMont = () => {

    const totalAmount: number[] = [];
    const info: number[] = [];
    if (isSuccess) {
      const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}`))

      montTransaction.map((t: Transaction) => {
        console.log(t)
        totalAmount.push(Number(t.amount))
      })
      if(transactions.length > 0){
        info.push(transactions.length);
      }
      const salesResult = totalAmount.length ? totalAmount.reduce((acc: number, current: number) => acc + current) : 0
      const expensesResult = info.length ? info[0] : 0
      return [salesResult, expensesResult]
    }
  }

  const datos = getAmountByMont() || [0, 0]

  const data = {
    title: "Balance de este mes",
    labelstitle: ["Ventas", "Ganancias"],
    datos: [...datos]
  }
  return (
    <div>
      <BarGraphicVertical key={7} {...data} />
    </div>
  )
}

export default BalanceCurrentMont
