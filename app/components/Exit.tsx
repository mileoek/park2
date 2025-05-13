"use client"
import React from 'react'
import axios from 'axios';

interface ExitProps {
    name: string;
    payment: number;
    children?: React.ReactNode; // Make children optional if needed
}




const Exit: React.FC<ExitProps> = ({ name,payment }) => {
    async function handleExit() {
        try {   
            await axios.delete('/api/araba', {
            data: { name: name , payment:Number(payment)}, // Pass the ID in the request body
        }).then((response) => {
            
        console.log('Araba silindi', response.data);
        alert('Araba silindi')});
        
    } catch (error) {
        console.error('Araba silinemedi', error);
        alert('Araba silinemedi');
    }
    // Perform any additional actions after successful deletion, like updating the UI or redirecting
}
    return (<>

        
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>handleExit}>Çıkış</button> */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleExit()}>Ausgang/Bezahlung</button>        
        
        </>)
}
export default Exit