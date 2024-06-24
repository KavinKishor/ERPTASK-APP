import axios from 'axios'
import React, { useState} from 'react'
import { loginUser } from '../URL/url'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './login.css'


const Login = ({setIsAuthenticated}) => {
    const navigate=useNavigate()
    
    const [email,setEmail]=useState()
    const [password,setpassword]=useState()

    let handleLogin=(e)=>{
        e.preventDefault()
        axios.post(loginUser,{email,password}).then((res)=> 
        {console.log(res)
            const token= res.data.token
            localStorage.setItem('token', token);
            if (token ===localStorage.getItem('token')){
                navigate("/dashboard");
                setIsAuthenticated(true)
            } else if(res.data){
                toast.error(res.data)
            }else{
                toast.success("You are successfully logged in")
            }
    }
    ).catch((err)=>toast.error(err))
   
    }
   
  return (
    <div>
          <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100 page-login" >
                <div className=" p-3 rounded log-form" style={{width : '40%'}}>
                    <h2 className='mb-3 '>Login</h2>
                    <form onSubmit={handleLogin} >
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(e) =>setpassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
