import React from 'react';
import prisma from '../lib/db';
import Link from 'next/link';
import TopFive from '../components/TopFive';

async function page() {
    const data = await prisma.deletedAuto.findMany();
    console.log(data, "data");

  return (
    <div>
        <TopFive />
        <h2 className="text-2xl font-bold mb-4">Araba Bilgileri Geçmişi</h2>
        {data && data.map((item) => (
            <div key={item.id}>
            <p>Araba Sahibi: {item.owner}</p>
            <p>Plaka: {item.plateNum}</p>
            <p>Duration: {item.duration}</p>
            <p>In Total : {(item.payment)/100}£</p>
            <br />
            </div>
        ))}
        <Link href="/.." 
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Geri Dön
            </button>
        </Link>
    </div>
  )}
export default page