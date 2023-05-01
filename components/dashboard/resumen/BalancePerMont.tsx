import React from 'react'
import { NextPage } from 'next'
import LineGraphic from '../graphics/LineGraphic'
import { getTransactions } from '@components/utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction } from '../../../app/types'

interface Data {
  title: string,
  bridge: string,
  labelRow: string[],
  labels1title: string,
  labels2title: string,
  labels1: string[],
  labels2: string[],
  dat1: number[],
  dat2: number[],
}
type Dat1Dat2 = [number[], number[]]

const BalancePerMont: NextPage = () => {

  const {
    data: transactions,
    
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const añoActual = fecha.getFullYear()
  function getAmountByMont() {
    const data1AndData2: Dat1Dat2 = [[], []]

    for (let i = 1; i <= 12; i++) {
      let j = i > 9 ? i : `0${i}`
      const info: number[] = [];
      if (isSuccess) {
        const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${j}`))
        const result = montTransaction.map((t: Transaction) => {
          info.push(t.amount)
        })
        if (info.length > 0) {
          //lo que se vendio
          const resCost = info.reduce((acc: number, current: number) => acc + current)
          data1AndData2[0].push(resCost)
        } else {
          data1AndData2[0].push(0)
        }
      }

    }
    return data1AndData2
  }
  function createData() {
    const result = getAmountByMont()

    const data = {
      title: 'Balance por Mes',
      labelRow: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      labelstitle: 'Venta Por Mes',
      dat1: result[0],
    }
    return data
  }

  const data = createData()


  return (
    <div >
      <LineGraphic key={1} {...data} />
    </div>
  )
}

export default BalancePerMont