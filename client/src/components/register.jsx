import React from 'react'
import { Link } from 'react-router-dom'
const Register = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <form className='bg-dark rounded-4 pt-5 px-4 ' style={{ width: '400px', height: '400px' }}>
                <h1 className='text-light text-center mb-5'>register</h1>
                <input type="text" className="form-control my-3" placeholder='your username' />
                <input type="password" className="form-control my-3" placeholder='your password' />
                <input type="submit" value="register" className="btn btn-success mb-1" />
                <br />
                <Link to='/login' className='text-light'>go to Loin?</Link>
            </form>
        </div>
    )
}

export default Register