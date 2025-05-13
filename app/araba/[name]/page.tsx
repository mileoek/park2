"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import Exit from '@/app/components/Exit';
import park from '@/app/components/Otopark';
import Link from 'next/link';



 function page(): JSX.Element {
   const  {name}  = useParams()

  const [data, setData] = useState(
    {
      owner: "",
      plateNum: "",
      timeOcupied: new Date(),
      placeId: "",
    }
  );
  const [price, setPrice] = useState(0);
  const [time, setTime] = useState({
    dk: 0,
    sa: 0,
  });

 function calculatePay(sa:number, dk: number) {
const totalHours = sa + dk / 60;
  let pay = 0;

  if (totalHours <= 0.33) {
    pay = 0;
  } else if (totalHours <= 4) {
    pay = Math.ceil(totalHours) * 120;
  } else if (totalHours <= 8) {
    pay = Math.ceil(totalHours) * 125;
  } else if (totalHours <= 12) {
    pay = Math.ceil(totalHours) * 130;
  } else if (totalHours <= 24) {
    pay = Math.ceil(totalHours) * 135;
  } else if (totalHours <= 48) {
    pay = Math.ceil(totalHours) * 145 + 500;
  } else {
    pay = Math.ceil(totalHours) * 155 + 1000;
  }

  return pay;
}



useEffect(() => {
  const getData = async () => {
   
    console.log(name);
    const response = await axios.get(`/api/araba/${name}`);
    console.log(response.data);
    return response.data;
  };

    getData().then((info)=>{
      setData(
        {
          owner: info.owner,
          plateNum: info.plateNum,
          timeOcupied: info.timeOcupied,
          placeId: info.placeId,
        }
      );
      console.log(info);
      const timeDiff = new Date().getTime() - new Date(info.timeOcupied).getTime();
      console.log(timeDiff);
      setTime({
        dk: Math.floor(timeDiff / (1000 * 60) % 60),
        sa: Math.floor(timeDiff / (1000 * 60 * 60)),
      })
      setPrice(calculatePay(Math.floor(timeDiff / (1000 * 60 * 60)), Math.floor(timeDiff / (1000 * 60) % 60)));
      console.log("price", price);
       });  
       

}, []);
  

 


return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Erklærung des Autos</h2>
      {data && 
        <div>
          <p>der Besitzer des Autos: {data.owner}</p>
          <p>das Nummerschild des Autos: {data.plateNum}</p>
          <p>der Eingang: {data.timeOcupied.toLocaleString()}</p>
          <br />
          <p>die Laufzeit: {time.sa} Stunde {time.dk} Minute</p>
          <p>Gesamt: {price/100} $</p>

<br/>
<Link href={`/`} className="bg-blue-500 text-white px-4 py-2 rounded">
<Exit name={data.placeId} payment={price}/>
         
          
         </Link>
          <br />
          <p>Sie haben das Auto in den Platz {data.placeId} eingeparkt</p>
        </div>
      }
      
    </div>
  );
}
 










export default page