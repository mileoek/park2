"use server";
import prisma from '../lib/db';
import React from 'react'
import Exit from './Exit';
import Link from 'next/link';

import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';
async function Otopark () {
    const parks = await prisma.parkPlace.findMany()
    const autos = await prisma.auto.findMany()



  async (name: string) => {
        const res:AxiosResponse = await axios.get('http://localhost:3000/api/araba', {
            data: { name: name },
        });
        console.log("DATA:",res.data);

    };  
    
  return (
    <>
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-black shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Autopark</h2>
            </div>
            {parks.map((park: { id: string; name: string; free: boolean }) => 
                (  
                <div key={park.id} className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mb-4">
                    <h2  className={park.free ? 'text-green-500 text-2xl font-bold mb-4' : 'text-red-500 text-2xl font-bold mb-4'}>{park.name}</h2>
                   
                    
                   {!park.free ? <Link href={`/araba/${park.name}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Ausgang/Bezahlung
                    </Link> : null}
                   

                </div>
            ))}
        </div>
    </>
  )
}

export default Otopark