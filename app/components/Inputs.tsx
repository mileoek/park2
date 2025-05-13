"use client"
import axios from "axios"
import prisma from "../lib/db"
import { useState } from "react"
import React from 'react'
import { NextRequest, NextResponse } from "next/server"

function Inputs () {

    const [yarak , setYarak] = useState();
    const[data, setData] = useState({
        plateNum: "",
        owner: "",
        parkPlace: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target // Destructure name and value from the event target
        setData((prev) => ({
            ...prev,
            [name]: value // Update the specific field based on the input's name
        }))
        // setData({
        //    plateNum: e.target.value,//
        //    owner: e.target.value,//         BURA OLDU ANASININ AMI
        //    parkPlace: e.target.value//      NERDEN ANLİCAM HANGİ İNPUTTAN GELDİĞİNİ
        // })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        // await prisma.auto.create({
        //     data: {
        //         plateNum: data.plateNum,
        //         owner: data.owner,
        //         parkPlace: {
        //             connect: {
        //                 id: data.parkPlace,
        //             },
        //         },
        //     }})
//--------------------------------------------------------------------------------------------------------------
e.preventDefault()
await axios.post(`http://localhost:3000/api/araba`, data, {
  
}).then((Response: { data: any }) => {
    console.log(Response.data);
}).catch((error) => {
    console.error("Error:", error);
});
//--------------------------------------------------------------------------------------------------------------

//await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/araba`, data)        
// .then((res) => {
//             console.log(res.data)
//         })
//         .catch((err) => {
//             console.log(err)
//         })       
// try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/araba`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     console.log("Success:", result);
// } catch (error) {
//     console.error("Error:", error);
// }
//--------------------------------------------------------------------------------------------------------------
        
        // const formData = {
        //     plateNum: e.target[0].value,
        //     owner: e.target[1].value,
        //     parkPlace: e.target[2].value
        // }
        // console.log(formData)
//--------------------------------------------------------------------------------------------------------------
        // e.preventDefault()
        // const res = await fetch('/api/araba', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // const result = await res.json()
        // console.log(result)
    }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl text-black font-bold mb-4" >Autopark</h2>
                <input onChange={handleChange} name="plateNum" type="text" placeholder="Nummerschild des Autos" className="border text-black border-gray-300 rounded-lg p-2 mb-4 w-full" />
                <input onChange={handleChange} name="owner" type="text" placeholder="Beistzer des Autos" className="border text-black border-gray-300 rounded-lg p-2 mb-4 w-full" />
                <input onChange={handleChange} name="parkPlace" type="text" placeholder="In welchem Platz haben Sie eingeparkt?" className="border text-black border-gray-300 rounded-lg p-2 mb-4 w-full" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Einparken</button>

           
                

            </div>
        </div>
    </form>
    </>
  )
}

export default Inputs