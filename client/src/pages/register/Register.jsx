import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './register.scss'
import axios from "axios"
const Register = () => {
  const [inputs,setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  });
  const [error,seterror] = useState(null)
  const navigate = useNavigate()
  
  const handleChange = e => {
  setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/api/auth/register`, inputs)
      Navigate("/")
    } catch (err) {
     seterror(err.response.data)
    }
  }
  console.log(error);
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
            <h1>Social World.</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit quidem possimus perspiciatis aliquid eius facilis iure ullam nisi eveniet delectus dolor voluptas facere</p>
            <span>Do You have an account?</span>
            <Link to="/login">
            <button>Login</button>
            </Link>  

        </div>
        <div className="right">
        <h1>Register</h1>
        <form>
            <input type="text" placeholder='Username' name="username"  onChange={handleChange}/>
            <input type="email" placeholder='Email' name="email"  onChange={handleChange}/>
            <input type="password" placeholder='Password' name="password"  onChange={handleChange}/>
            <input type="text" placeholder='Name' name="name"  onChange={handleChange}/>
           {error && error}
            <button onClick={handleSubmit}>Register</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Register
