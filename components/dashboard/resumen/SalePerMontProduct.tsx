import React from 'react'
import { NextPage } from 'next'
import DoughnutGraphic from '../graphics/DoughnutGraphic'
import { getTransactions } from '@components/utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction } from '../../../app/types'

const SalePerMontProduct: NextPage = () => {

  const {
    data: transactions,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const mesActual = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : `0${fecha.getMonth() + 1}`;
  const añoActual = fecha.getFullYear()

  let info = [0, 0, 0, 0]

  if (isSuccess) {
    const montTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}`))

    montTransaction.map((t: Transaction) => {
      if(t.membership === 'WOOD'){
        info[0] = info[0] + 1;
      };
      if(t.membership === 'SILVER'){
        info[1] = info[1] + 1;
      };
      if(t.membership === 'GOLD'){
        info[2] = info[2] + 1;
      };
      if(t.membership === 'PLATINUM'){
        info[3] = info[3] + 1;
      };    
    })
  }

  const props = {
    title: "Membresías vendidas por categoría",
    bridge: "vendidas este mes",
    labels: [
      'WOOD',
      'SILVER',
      'GOLD',
      'PLATINUM'
    ],
    dat: info,
  }


  return (
    <div>
      <DoughnutGraphic key={4} {...props} />
    </div>
  )
}

export default SalePerMontProduct