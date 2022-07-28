import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import {FaInfo, FaCaretRight} from 'react-icons/fa'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {user, isError, isSuccess, message} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
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
    setFormData(prevState => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(formData.password !== formData.password2){
      toast.error(message)
    } else {
      const userData ={
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }

      dispatch(register(userData))
    }
  }

  return (
    <div className='form--wrapper'>
      <div className="form--main container">
      <img src="./images/logo-dark.png" alt="innout" className='form--logo'/>
      <div className='form'>
        <h2 className='form__title'>Create account</h2>
        <form onSubmit={handleSubmit}>
          <div className='form__group'>
            <label htmlFor="name">Your name</label>
            <input 
              type="text" 
              id='name' 
              value={formData.name} 
              name='name'
              onChange={handleChange}
              placeholder='first and last name' 
              />
          </div>

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
              placeholder='At least 6 characters'
              />
              <div className='password--info'>
                <p><FaInfo className='password--info__icon' /> Passwords must be a least 6 characters</p>
              </div>
          </div>

          <div className='form__group'>
            <label htmlFor="password2">Re-enter password</label>
            <input 
              type="password" 
              id='password2' 
              value={formData.password2} 
              name='password2'
              onChange={handleChange} 
              />
          </div>
          <button type='submit' className='btn form-btn'>Continue</button>
        </form>

        <div className='form--terms'>
          <p >By creating an accout, you agree to Innout's <Link to='/'>Conditions of Use </Link> and <Link to='/'> Privary Notice</Link></p>
        </div>

        <div className='sigin-form'>
          <p>Already have an account? <Link className='signin--link' to='/login'>Sign-In <FaCaretRight /></Link></p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Register