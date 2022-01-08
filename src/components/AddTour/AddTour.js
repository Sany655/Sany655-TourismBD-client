import axios from 'axios'
import React, { useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'

const AddTour = () => {
    const [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmjLDuyCDutqy-LUVlQ-a1PPRkZeeNisx-Q&usqp=CAU')
    const place = useRef()
    const duration = useRef()
    const desc = useRef()
    const price = useRef()
    const { user } = useAuth()

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('/', {
            place: place.current.value,
            duration: duration.current.value,
            price: price.current.value,
            desc: desc.current.value,
            img: image,
            user: user
        }).then(responce => {
            alert(responce.data)
            place.current.value='';
            duration.current.value='';
            price.current.value='';
            desc.current.value='';
        })
    }

    return (
        <div className='md:flex justify-around items-center w-full'>
            <div className='px-2 md:w-2/4 md:p-20'>
                <form className="border px-2 my-2 md:px-20 py-10 broder shadow flex flex-col" onSubmit={handleSubmit}>
                    <h1 className="text-2xl md:my-4">Organize tour</h1>
                    <input ref={place} type="text" className="border my-3 px-4 py-2" placeholder='Place' />
                    <input ref={duration} type="text" className="border my-3 px-4 py-2" placeholder='Duration' />
                    <input ref={price} type="text" className="border my-3 px-4 py-2" placeholder='Price' />
                    <input ref={desc} type="text" className="border my-3 px-4 py-2" placeholder='Short Description' />
                    <input type="text" className="border my-3 px-4 py-2" placeholder='Banner url' onChange={(e) => setImage(e.target.value)} value={image} />
                    <button className='bg-indigo-600 px-4 py-1 my-3 text-white' >Submit</button>
                </form>
            </div>
            <div className="overflow-hidden md:w-2/4">
                <img src={image} alt={image ? 'invalid url' : 'your image'} />
            </div>
        </div>
    )
}

export default AddTour
