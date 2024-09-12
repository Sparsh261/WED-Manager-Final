import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import './Dashboard.css'
import Navbar from './Navbar';
import url from '../../url'


export default function Dashboard(){
    
    const [dashDetails, setdashDetails] = useState({Guests:0, Date:0,Budget:0,Guests_invited:0});

    async function fetchData() {
        const id = localStorage.getItem("authTokens")
        // console.log(id)
        const res = await fetch(`${url.url}/users/${id}`)
        const user = await res.json();
        // let d = new Date(user.user.Date).getDate() - new Date().getDate();
        // user.user.Date = d;
        setdashDetails(user.user);
    }

    useEffect(()=>{fetchData()},[]);
   
    
    return(
        <>
            <Navbar/>

            <div className="dashboard container ">
                <h1>Dashboard</h1>
                <div className="container content">
                    <div className="content-header">
                        <h3>Wedding Details</h3>
                        <Link to="/wedding-details"><button className="rounded p-1 w-100  ">Edit Wedding Details</button></Link>
                    </div>
                    <div className="content-cards">
                        <div className="box">
                            <p>Guests</p>
                            <p>{dashDetails.Guests}</p>
                        </div>
                        <div className="box">
                            <p>Days to Go</p>
                             <p>{dashDetails.Date}</p> 
                        </div>
                        <div className="box">
                            <p>Budget</p>
                            <p>{dashDetails.Budget}</p>
                        </div>
                        <div className="box">
                            <p>Guests invited</p>
                            <p>{dashDetails.Guests}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}