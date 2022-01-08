import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import logo from '../../logo-white.svg'

const Header = () => {
    const { user, logout } = useAuth()
    return (
        <div className='bg-indigo-400 md:flex justify-between px-10 xl:px-40 items-center text-white p-8'>
            <img src={logo} alt="" className='w-36 inline-block mb-4 md:mr-auto md:mb-0' />
            <nav className='flex flex-col md:flex-row gap-4'>
                <NavLink to='/'>Home</NavLink>
                {user.uid ? (
                    <>
                        <NavLink to='/my-bookings'>My Bookings</NavLink>
                        <NavLink to='/add-tour'>Add Tour</NavLink>
                        <NavLink to='/manage-bookings'>Manage Bookings</NavLink>
                        <button onClick={logout} >logout <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg></button>
                    </>
                ) : <NavLink to='/login'>Login <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg></NavLink>}
            </nav>
        </div>
    )
}

export default Header
