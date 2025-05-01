import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        
        
    }

    const handleUsername = (e) => {
         setUername(e.target.value)

    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <form className='bg-dark rounded-4 pt-5 px-4 ' style={{ width: '400px', height: '400px' }} onSubmit={handleLogin}>
                <h1 className='text-light text-center mb-5'>Login</h1>
                <input type="text" className="form-control my-3" placeholder='your username' value={username} onChange={handleUsername} />
                <input type="password" className="form-control my-3" placeholder='your password' value={password} onChange={handlePassword} />
                <input type="submit" value="Login" className="btn btn-success mb-1"  />
                <br />
                <Link to='/register' className='text-light'>create account?</Link>
            </form>
        </div>
    )
}

export default Login