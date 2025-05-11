import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const loginData = {
                email,
                password
            }
            // console.log(loginData);
            
            const result = await axios.post("http://127.0.0.1:3000/api/auth/login", loginData);
            const {isSuccess} = result.data;
            // console.log(isSuccess) 
            if(isSuccess) navigate('/');

        } catch(error)  {
            console.log("error: ", error);
        }
        
        
    }

    const handleemail = (e) => {
         setEmail(e.target.value)

    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <form className='bg-dark rounded-4 pt-5 px-4 ' style={{ width: '400px', height: '400px' }} onSubmit={handleLogin}>
                <h1 className='text-light text-center mb-5'>Login</h1>
                <input type="text" className="form-control my-3" placeholder='your email' value={email} onChange={handleemail} />
                <input type="password" className="form-control my-3" placeholder='your password' value={password} onChange={handlePassword} />
                <input type="submit" value="Login" className="btn btn-success mb-1"  />
                <br />
                <Link to='/register' className='text-light'>create account?</Link>
            </form>
        </div>
    )
}

export default Login