import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {
    useEffect(() => {
        
        axios('https://mazharsany.xyz/tourismbd/rest_api/place.php').then(res=>console.log(res.data))
        
    }, [])
    return (
        <div>
            <img src="https://mazharsany.xyz/tourismbd/image/coxs.jpg" alt="" />
        </div>
    )
}

export default Test
