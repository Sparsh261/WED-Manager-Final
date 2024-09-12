import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom'
import { Router } from 'react-router-dom';
// import { Redirect } from 'react-router';
import Navbar from './Navbar';
import url from '../../url'



export default function ToDo() {

    const [name, setName] = useState("");
    const [description, setdescripton] = useState("");
    const [todos, settodos] = useState([]);

    const add = (event) => {
        event.preventDefault();
        if (name === "" || description === "") {
            alert("Both Fields are necessary.");
            return;
        }
        let id = Math.floor(Math.random() * 10000);
        id++;
        settodos([...todos, { name, description, id }])
        renderList;
        updateValues(todos);
        setdescripton("")
        setName("");
    }

    
    async function updateValues(tasks) {
        console.log("hi");
        const id = localStorage.getItem("authTokens")
        
        const res = await fetch(`${url.url}/users/update`, {
            method: 'PATCH',
            body: JSON.stringify({
                userData: {task:tasks},
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
        console.log(user.user.task)
        settodos(user.user.task);
    }
    
    useEffect(() => { fetchData() }, []);
    // useEffect(() => { updateValues(); }, [todos]);



    const renderList = todos.map((todo) => {
        return (
            <div>
                <ul style={{ display: "inline" }}><li> <strong>Task : </strong> {todo.name} </li><small><strong>Description : </strong>{todo.description}</small></ul>
                <button onClick={() => deleteContactHandler(todo.id)} style={{ display: "inline", position: "relative", left: "100px", borderRadius: "10px", backgroundColor: "red" }} className="primary" >Delete</button>
            </div>
        )
    })


    const deleteContactHandler = (id) => {
        const newTodos = todos.filter(todo => {
            return todo.id != id;
        })
        console.log(newTodos)
        settodos(newTodos);
        updateValues(newTodos);
        renderList;
    }

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem("MyToDos"));
    //     if (items) { settodos(items); renderList; }
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem("MyToDos", JSON.stringify(todos))
    // }, [todos])


    return (
        <>
            <Navbar />

            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>

                <form onSubmit={add}>

                    <h1>TODos</h1>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Task</label>
                        <input type="text " className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Task ToDo" onChange={(event) => setName(event.target.value)} value={name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Description" onChange={(event) => setdescripton(event.target.value)} value={description} />
                    </div>

                    <button type="submit" className="btn btn-primary mb-5">Add</button>

                </form>

                <div>
                    {renderList}
                </div>


            </div>


        </>

    )
}

