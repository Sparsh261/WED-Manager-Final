import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import url from '../../url'


export default function GuestList() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [guests, setGuests] = useState([]);

    const add = (event) => {
        event.preventDefault();
        if (name === "" || email === "") {
            alert("Both Fields are necessary.");
            return;
        }
        let id = Math.floor(Math.random() * 10000);
        id++;
        setGuests([...guests, { name, email, id }])
        renderList;
        updateValues(guests);
        setEmail("")
        setName("");
    }

    const renderList = guests.map((guest) => {
        return (
            <div>
                <ul style={{ display: "inline" }}><li> <strong>Name : </strong> {guest.name} </li><small><strong>Email : </strong>{guest.email}</small></ul>
                <button onClick={() => deleteContactHandler(guest.id)} style={{ display: "inline", position: "relative", left: "20%", borderRadius: "10px", backgroundColor: "red" }} className="primary" >Delete</button>
            </div>
        )
    })


    async function updateValues(guests) {
        
        const id = localStorage.getItem("authTokens")
        
        const res = await fetch(`${url.url}/users/update`, {
            method: 'PATCH',
            body: JSON.stringify({
                userData:{guestList: guests},
                id: id
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        

    }
    

    async function fetchData() {
        const id = localStorage.getItem("authTokens")
        const res = await fetch(`${url.url}/users/${id}`)
        const user = await res.json();
       
        setGuests(user.user.guestList);
    }
    
    useEffect(() => { fetchData() }, []);


    const deleteContactHandler = (id) => {
        const newGuests = guests.filter(guest => {
            return guest.id != id;
        })
        setGuests(newGuests);
        updateValues(newGuests);
        renderList;
    }

    return (

        <>

            <Navbar />

            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>

                <form onSubmit={add}>

                    <h1>Guests List</h1>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text " className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Name" onChange={(event) => setName(event.target.value)} value={name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Email" onChange={(event) => setEmail(event.target.value)} value={email} />
                    </div>

                    {/* <Link to="/"><button type="submit" className="btn btn-primary">Add</button></Link> */}
                    <button type="submit" className="btn btn-primary mb-5">Add</button>
                </form>
                <div>
                    {renderList}
                </div>
            </div>

        </>
    )
}

