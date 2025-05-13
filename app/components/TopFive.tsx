"use server"

import prisma from '../lib/db'
import React from 'react'

async function TopFive() {

    const TopFive = await prisma.user.findMany({
        orderBy: {
            payment: 'desc',
        },
        take: 5,
    }).then((topFive) => {
        console.log("Top 5 araba", topFive);
        return topFive;
    });

  return (
    <div>
        <h1 className='text-2xl font-bold'>En Sadık Müşterilerimiz</h1>
        <table className="table-auto w-full">
            <thead>
            <tr>
                <th className="px-4 py-2">İsim</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Duration</th>
            </tr>
            </thead>
            <tbody>
            {TopFive.map((user) => (
                <tr key={user.id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{((user.payment!) / 100)}€</td>
                <td className="border px-4 py-2">{user.duration}dk</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default TopFive