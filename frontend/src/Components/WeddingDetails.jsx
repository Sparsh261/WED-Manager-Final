import React, { useState,useEffect} from 'react'
import './WeddingDetails.css'
import url from '../../url'
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";



export default function WeddingDetail() {
    
    const history = useHistory();
    
    const [weddingDetails, setweddingDetails] = useState({ name: "", gender: "", Your_Partners_First_Name: "", Budget: 0, Date: 0, Location: "", Guests: 0 });
    
    const chngValues = (e) => {
        const { name, value } = e.target;
        setweddingDetails({ ...weddingDetails, [name]: value })
    }
    
    useEffect(()=>{fetchData()},[]);

    async function updateValues(e) {

        e.preventDefault();

        const id = localStorage.getItem("authTokens")

       
        weddingDetails.Date = parseInt(weddingDetails.Date.substring(8)) - new Date().getDate() ;
        const res = await fetch(`${url.url}/users/update`, {
            method: 'PATCH',
            body: JSON.stringify({
                userData: weddingDetails,
                id : id
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        history.push("/dashboard");

    }


    async function fetchData() {
        const id = localStorage.getItem("authTokens")
        const res = await fetch(`${url.url}/users/${id}`)
        const user = await res.json();
        let d = new Date(user.user.Date);
        console.log("YYYY-MM-dd")
        // user.user.Date = d;
        setweddingDetails(user.user);
    }


    
    return (
        <>

            <Navbar/>
             
            <div  className='wedDetails container' >

                <h2>Wedding Details</h2>

                <form id='details' onSubmit={updateValues} >

                    <h4>Your Name</h4>
                    <input type="text" placeholder='Name' name="name" value={weddingDetails.name} onChange={chngValues}  />

                    <h4>Type</h4>
                    <select name="gender" id="gender" onChange={chngValues}>
                        <option value="Groom">Groom</option>
                        <option value="Bride">Bride</option>
                    </select>

                    <h4>Your Partner's Name</h4>
                    <input type="text" placeholder=" Your Partner's First Name " value={weddingDetails.Your_Partners_First_Name} name="Your_Partners_First_Name" onChange={chngValues} />

                    <h4>Estimated Budget</h4>
                    <input type="number" placeholder='Budget' name="Budget" value={weddingDetails.Budget} onChange={chngValues} />

                    <h4>Date of Wedding</h4>
                    <input type="date" placeholder='Date' required name="Date" value={weddingDetails.Date} onChange={chngValues} />

                    <h4>Location</h4>
                    <input type="text" placeholder='Location' name="Location" value={weddingDetails.Location} onChange={chngValues} />

                    <h4>Guests</h4>
                    <input type="number" placeholder='No. of Guests' name="Guests" value={weddingDetails.Guests} onChange={chngValues} />

                    <button className="btn btn-primary submit-button" >Update</button>

                </form>

            </div>
        </>
    )
}