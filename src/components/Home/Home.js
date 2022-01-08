import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loading from '../Loading/Loading';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Home = () => {
    const [main, setMain] = useState([])
    const [latest, setLatest] = useState([])
    const [latestMamber, setLatestMamber] = useState([])

    useEffect(() => {
        axios('/').then((response) => {
            setMain(response.data)
        })
        axios('/latest').then((response) => {
            setLatest(response.data)
        })
        axios('/latest-member').then((response) => {
            setLatestMamber(response.data)
        })
    }, [])

    if (!main&&!latest&&!latestMamber) {
        return <Loading />
    }

    return (
        <div className="xl:mx-20">
            {/* top banner */}
            <div className="bg-cover bg-center" style={{backgroundImage:'url("assets/banner.jpg")'}}>
                <h1 className="text-6xl md:text-right pt-28 text-white">TourismBD</h1>
            </div>

            {/* main offers */}
            <div className="my-5 shadow-lg border" id='offers'>
                <h2 className="text-6xl m-5">Grand tours</h2>
                <Carousel responsive={responsive} className='my-5'>
                    {
                        main.map(tour => (
                            <div key={tour._id} className='p-5'>
                                <div className="border">
                                    <img src={tour.img} alt="" className='w-full h-40' />
                                    <div className="p-5">
                                        <h3 className="text-2xl">{tour.place}</h3>
                                        <p className='my-2'>Price : {tour.price}</p>
                                        <p className='my-2'>For {tour.duration}</p>
                                        <Link to={`/book-tour/${tour._id}`}><button className='bg-indigo-600 text-white px-10 py-1 font-bold'>Book Now</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>

            {/* Our member section */}
            <div className='my-10' id='members'>
                <h3 className="text-4xl my-5">OUR LATEST MEMBERS</h3>
                <p className="text-lg">We have so many tour organizer, new of us.</p>
                <div className="md:grid grid-cols-3 my-5">
                    {
                        latestMamber.map(member => (
                            <div key={member._id}>
                                <img src={member.photo} alt="" className='m-auto' />
                                <h3 className="text-2xl">{member.name}</h3>
                                <p><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg> {member.email}</p>
                                <p><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg> {member.phone ? member.phone : 'Unavailable'}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* user added tours */}
            <div className="my-5 shadow-lg border" id='offers'>
                <h2 className="text-6xl m-5">Latest tours</h2>
                <Carousel responsive={responsive} className='my-5'>
                    {
                        latest.map(tour => (
                            <div key={tour._id} className='p-5'>
                                <div className="border">
                                    <img src={tour.img} alt="" className='w-full h-40' />
                                    <div className="p-5">
                                        <h3 className="text-2xl">{tour.place}</h3>
                                        <p className='my-2'>Price : {tour.price}</p>
                                        <p className='my-2'>For {tour.duration}</p>
                                        <Link to={`/book-tour/${tour._id}`}><button className='bg-indigo-600 text-white px-10 py-1 font-bold'>Book Now</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            

            {/* travel tips */}
            <div className="py-20 mt-10" style={{ backgroundImage: ' url("https://mazharsany.xyz/tourismbd/assets/img/1920x500/img1.jpg")' }}>
                <div className="mx-auto text-center xl:mt-5 xl:mb-2 px-3 px-md-0">
                    <h6 className="text-white text-4xl font-bold mb-1">Travel Tips</h6>
                    <p className="text-white font-lg font-weight-normal mb-4 pb-1 px-md-3 px-lg-0">Northern Ireland’s is now contingent. Britain is getting a divorce Northern Ireland is being offered a trial separation for Britain there is a one</p>
                </div>
            </div>
        </div>
    )
}

export default Home
