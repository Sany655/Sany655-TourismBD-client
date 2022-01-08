import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import useAuth from '../../hooks/useAuth'

const BookTour = () => {
    const params = useParams()
    const [place, setPlace] = useState({})
    const name = useRef('')
    const email = useRef('')
    const phone = useRef('')
    const date = useRef('')
    const person = useRef('')
    const { user } = useAuth()
    const history = useHistory()

    useEffect(() => {
        name.current.value = user.name?user.name:'';
        email.current.value = user.email?user.email:'';
        phone.current.value = user.phone?user.phone:'';
        axios(`/place/${params.id}`)
            .then(res => {
                setPlace(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        axios.post('/booking', {
            user: user.uid,
            name:name.current.value,
            email:email.current.value,
            phone:phone.current.value,
            date:date.current.value,
            person:person.current.value,
            status:'panding',
            place:place
        }).then(responce => {
            history.push('/')
            alert(responce.data)
        })
    }

    return (
        <div className='md:w-1/2 mx-auto my-10'>
            <img src={place.img} alt="" className='m-auto' />
            <h1 className="text-4xl">{place.place}</h1>
            <p className="text-lg">Per Person {place.price} for {place.duration}</p>
            <p className="text-md">{place.desc}</p>
            <form className="border px-20 py-10 broder shadow flex flex-col my-10" onSubmit={handleSubmit}>
                <h1 className="text-2xl md:my-4">Book Now</h1>
                <input required type="text" className="border my-3 px-4 py-2" placeholder='Name' ref={name} disabled={user.name?true:false}/>
                <input required type="text" className="border my-3 px-4 py-2" placeholder='Email' ref={email} disabled={user.email?true:false}/>
                <input required type="text" className="border my-3 px-4 py-2" placeholder='Phone' ref={phone} disabled={user.phone?true:false}/>
                <input required type="date" ref={date} className="border my-3 px-4 py-2" placeholder='Date' />
                <input required type="text" ref={person} className="border my-3 px-4 py-2" placeholder='Number of tickets' />

                <button className='bg-indigo-600 px-4 py-1 my-3 text-white' >Submit</button>
            </form>
        </div>
    )
}

export default BookTour
