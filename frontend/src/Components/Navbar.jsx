import React from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import { useHistory } from "react-router-dom";




export default function Navbar() {

    const history = useHistory();

    const logout = ()=>{
        localStorage.removeItem("authTokens");
        history.push("/");
    }

    return (
        <>
            <nav className="navbar  navbar-expand-lg  bg-body-tertiary" >
                <Link to="/">
                    <span className="navbar-brand font-weight-bold "><span className='h1 ms-5'>WedManager</span></span>
                </Link>
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className=" navbar-collapse collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/wedding-details">Wedding List</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/guest-list" className="nav-link" >Guests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="todo-list">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <button className='rounded p-1 bg-danger' onClick={logout}>Logout</button>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}