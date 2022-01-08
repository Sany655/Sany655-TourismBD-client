import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

const MyBooking = () => {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios(`/booking/${user.uid}`)
            .then(response => {
                console.log(response.data);
                setBookings(response.data);
            })
    }, [])

    function handleCancel(id) {
        if (window.confirm('Are you sure about it?')) {
            axios.delete(`/booking/${id}`)
                .then(response => {
                    setBookings(bookings.filter(booking => booking._id != id))
                })
        }
    }

    return (
        <div>
            <h1 className="text-4xl my-10">My Bookings</h1>
            {
                bookings.length > 0 ? (
                    <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-10 p-5">
                        {
                            bookings.map(booking => (
                                <div key={booking._id} className='border shadow'>
                                    <img src={booking.place.img} alt="unavailable image" className='h-48 w-full' />
                                    <div className="flex flex-col justify-center items-center p-5">
                                        <h2 className="text-xl">{booking.place.place}</h2>
                                        <p className="text-md">Per Person {booking.place.price} for {booking.place.duration}</p>
                                        <p className="text-md">Total {booking.person} person</p>
                                        <p className="text-md">Status : {booking.status}</p>
                                        <button className='bg-red-500 text-white px-4 pb-1 mt-5' onClick={() => handleCancel(booking._id)}>Cancel</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ):(
                    <h3 className='h-96 flex justify-center items-center'>You have nothing booked yet!</h3>
                )
            }
        </div>
    )
}

export default MyBooking
