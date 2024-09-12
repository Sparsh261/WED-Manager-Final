import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom'
import { Router } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import url from '../../url'

export default function Signup() {

    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const userAdd = async (e) => {
        e.preventDefault();
        const res = await fetch(`${url.url}/users/signup`, {
            method: 'POST',
            body: JSON.stringify({
                "name": e.target[0].value,
                "email": e.target[1].value,
                "password": e.target[2].value
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        if (data.status === "success")
            history.push("/login");
        else alert(data.msg)
    }

    return (
        <>
            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>

                <form onSubmit={userAdd}>

                    <h1>Signup</h1>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text " className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" required
                            placeholder="Enter Name" onChange={(event) => setName(event.target.value)} value={name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input type="email" className="form-control" id="exampleInputPassword1" placeholder="Email" required onChange={(event) => setEmail(event.target.value)} value={email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Passowrd" required onChange={(event) => setPassword(event.target.value)} value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-5">Signup</button>
                    <Link to='/login'> <button type="submit" className="btn btn-danger mb-5 ms-4">Already a user</button></Link>
                </form>
            </div>


        </>


    )
}

