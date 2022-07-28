import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../../features/auth/authSlice'
import { toast } from 'react-toastify'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect( () => {
    if (isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/dashboard')
    }

    dispatch(reset)

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    const{name, value} = e.target
    setFormData(prevState => {
      return{
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: formData.email,
      password: formData.password
    }

    dispatch(login(userData))
    
  }
  return (
    <div className='form--wrapper'>
      <div className="form--main container">
        <img src="./images/logo-dark.png" alt="innout" className='form--logo' />
        <div className='form'>
          <h2 className='form__title'>Sign-In</h2>

          <form onSubmit={handleSubmit}>
            <div className='form__group'>
              <label htmlFor="email">Your email</label>
              <input 
                type="email" 
                id='email' 
                value={formData.email} 
                name='email'
                onChange={handleChange} 
                />
            </div>

            <div className='form__group'>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id='password' 
                value={formData.password} 
                name='password'
                onChange={handleChange} 
                />
            </div>

            <button type='submit' className='btn form-btn'>Continue</button>
          </form>

          <div className='form--terms'>
            <p >By creating an accout, you agree to Innout's <Link to='/'>Conditions of Use </Link> and <Link to='/'> Privary Notice</Link></p>
          </div>

          <div className='forgotten--password'>
            <Link to='/reset'>Forgotten password?</Link>
          </div>
        </div>
      </div>

      <div className='new-to-innout container'>
        <h6>New to Innout?</h6>
        <Link className='btn-register' to='/register'>Create your Innout Account</Link>
      </div>
    </div>
  )
}

export default Login