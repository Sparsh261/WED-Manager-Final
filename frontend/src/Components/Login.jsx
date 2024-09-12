import { useState } from "react";
import { Link } from "react-router-dom";
import url from '../../url'
import { useHistory } from "react-router-dom";



export default function Login() {

    const history = useHistory();

    const [userEmail, setUserEmail] = useState()
    const [userPassword, setUserPassword] = useState()

    const userlogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${url.url}/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                "email": e.target[0].value,
                "password": e.target[1].value
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        if (data.status === "true") {
            localStorage.setItem("authTokens", data.authToken)
            history.push("/dashboard");
        }
        else alert(data.msg)
    }

    return (
        <>
            <div className="container   " style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>               
                
                <form onSubmit={userlogin} >
         
                    <h1>Login</h1>
                    
                    <div className="form-group">
                        <label for="exampleInputEmail1" className="mt-2 fs-5">Email address</label>
                        <input type="email" className="form-control w-75 " id="exampleInputEmail1
                        email" name="email" onChange={(e) => { setUserEmail(e.target.value) }}
                            aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted bg-light ">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1" className="mt-3 fs-5">Password</label>
                        <input type="password" className="form-control w-75" id="exampleInputPassword1 password"
                            name="password" onChange={(e) => { setUserPassword(e.target.value) }}
                            placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-primary ">Submit</button>
                    <Link to="/signup"><button type="button" className="btn btn-danger ms-5">Sign up</button>
                    </Link>
                </form>
            </div>







            {/* <div className="container" style={{ backgroundColor: "#fff", maxWidth: "80%", borderRadius: "10px", marginTop: "5%", padding: "30px" }}>

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
            </div> */}


        </>
    )
}
