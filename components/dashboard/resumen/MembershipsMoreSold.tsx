import React from 'react'
import { NextPage } from 'next'
import DoughnutGraphic from '../graphics/DoughnutGraphic'
import { getTransactions } from '@components/utils/dbFetching'
import { useQuery } from 'react-query'
import { Transaction } from '../../../app/types'

interface Ele {
  quantity: number,
  name: string
}
interface Data {
  title: string,
  bridge: string,
  labels: string[],
  dat: number[],
}

interface info {
  wood: number,
  silver: number,
  gold: number,
  platinum: number
};

const MembershipsMoreSold: NextPage = () => {

  const {
    data: transactions,
    isSuccess
  } = useQuery(['transactions'], getTransactions)

  const fecha = new Date();
  const diaActual = fecha.getDate() > 9 ? fecha.getDate() : `0${fecha.getDate()}`;
  const mesActual = fecha.getMonth() + 1 > 9 ? fecha.getMonth() + 1 : `0${fecha.getMonth() + 1}`;
  const añoActual = fecha.getFullYear()

  let info: info = {
    wood: 0,
    silver: 0,
    gold: 0,
    platinum: 0
  };

  if (isSuccess) {
    const dayTransaction = transactions.filter((t: Transaction) => t.createdAt.includes(`${añoActual}-${mesActual}-${diaActual}`))
    dayTransaction.map((t: Transaction) => {
      if(t.membership === 'WOOD'){
        info.wood = info.wood + 1;
      };
      if(t.membership === 'SILVER'){
        info.silver = info.silver + 1;
      };
      if(t.membership === 'GOLD'){
        info.gold = info.gold + 1;
      };
      if(t.membership === 'PLATINUM'){
        info.platinum = info.platinum + 1;
      };
    })
  }

  const data = [info.wood, info.silver, info.gold, info.platinum];
  let higher = data.sort((a,b)=>a-b);
  let highest = higher[0];
  let datos = {
    title: "Total vendido en $ por membresía",
    bridge: "vendidas este mes",
    labels: [
      'WOOD',
      'SILVER',
      'GOLD',
      'PLATINUM'
    ],
    dat: data,
  }

  return (
    <div>
      {/* <DoughnutGraphic key={2} dat={...datos}/> */}
      <div><h3>El producto mas vendidos es: {highest}</h3></div>
    </div>
  )
}

export default MembershipsMoreSold;