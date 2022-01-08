import axios from 'axios';
import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Login = () => {
    const { signinUsingGoogle } = useAuth();
    const location = useLocation()
    const history = useHistory()
    const redirect_url = location.state?.from || '/';
    const handleGoogleLogin = () => {
        signinUsingGoogle()
            .then((result) => {
                axios.post('register-user',{
                    uid:result.user.uid,
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                    phone:result.user.phoneNumber
                }).then(response=>{
                    history.push(redirect_url)
                })
            })
    }
    return (
        <div className='flex items-center justify-center' style={{height:'90vh'}}>
            <div>
                <h1 className="text-2xl">Join TourismBD</h1>
                <button onClick={handleGoogleLogin} className='bg-indigo-500 text-white px-10 py-2 m-10'>Signup With Google <i className="fab fa-google"></i></button>
            </div>
        </div>
    )
}

export default Login
