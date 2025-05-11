import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleregister = async (e) => {
        e.preventDefault();

        try{
            const registerData = {
                email,
                password
            }
            console.log(registerData);
            
            const result = await axios.post("http://127.0.0.1:3000/api/auth/register", registerData);
            console.log(result.data);

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
            <form className='bg-dark rounded-4 pt-5 px-4 ' style={{ width: '400px', height: '400px' }} onSubmit={handleregister}>
                <h1 className='text-light text-center mb-5'>register</h1>
                <input type="text" className="form-control my-3" placeholder='your email' value={email} onChange={handleemail} />
                <input type="password" className="form-control my-3" placeholder='your password' value={password} onChange={handlePassword} />
                <input type="submit" value="register" className="btn btn-success mb-1"  />
                <br />
                <Link to='/login' className='text-light'>create account?</Link>
            </form>
        </div>
    )
}

export default Register