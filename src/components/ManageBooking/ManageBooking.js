import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ManageBooking = () => {
    const [books, setBooks] = useState([])
    const [status, setStatus] = useState(false)
    useEffect(() => {
        axios('bookings').then(response => setBooks(response.data))
        setStatus(false)
    }, [status])
    function handleDelete(id) {
        if (window.confirm('Are you sure about this?')) {
            axios.delete(`/booking/${id}`).then(res => {
                setBooks(books.filter(book => book._id != id));
            })
        }
    }
    function handleApprove(id) {
            axios.put(`/booking/${id}`).then(res => {
                // setStatus(true)
                console.log(res.data)
            })
    }
    return (
        <div className="p-5">
            <h1 className="text-4xl">ALL BOOKINGS</h1>
            <table className="md:w-full border my-10">
                <thead>
                    <tr>
                        <th className='border'>Name</th>
                        <th className='border'>Person</th>
                        <th className='border'>Place</th>
                        <th className='border'>Date</th>
                        <th className='border'>Status</th>
                        <th className='border'>#</th>
                        <th className='border'>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => (
                            <tr key={book._id} className='py-5'>
                                <td className='border'>{book.name}</td>
                                <td className='border'>{book.person}</td>
                                <td className='border'>{book.place.place}</td>
                                <td className='border'>{book.date}</td>
                                <td className='border'>{book.status}</td>
                                <td className='border'><button className="text-white bg-green-600 px-3 pb-1 my-10" onClick={() => handleApprove(book._id)} disabled={book.status==='panding'?false:true}>{book.status==='panding'?"Approve":"panding"}</button></td>
                                <td className='border'><button className="text-white bg-red-600 px-3 pb-1 my-10" onClick={() => handleDelete(book._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ManageBooking
