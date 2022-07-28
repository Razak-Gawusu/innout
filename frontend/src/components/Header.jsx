import React from 'react'
import { logout, reset } from '../features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {FaSignInAlt, FaUser, FaMoon, FaSun, FaSignOutAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import {useTheme, useUpdateTheme} from '../Context/ThemeProvider'

function Header() {

    const theme = useTheme()
    
    const toggleTheme = useUpdateTheme() 

    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    

  return (
    <div className='header--wrapper'>
        <div className='header container'>
            <Link to='/'>
                <img src="./images/logo-light.png" alt="innout" />
            </Link>
            <ul className='nav__list'>
                {user ? (
                    <>
                        <li className='nav__item'>
                            <button className='header--logo' onClick={handleLogout}>
                                <FaSignOutAlt className='nav__item--img' /> Logout
                            </button>
                        </li>
                        
                        <li className='nav__item'>
                            <Link className='nav__link' to='/dashboard'>
                                <FaUser className='nav__item--img'/>
                            </Link> 
                        </li>

                        <li className='nav__item themeToggle' onClick={toggleTheme}>
                            {(theme) ? (<FaSun className='themeToggle--icon'/>):(<FaMoon className='themeToggle--icon'/>)}
                        </li>
                    </> 
                ) : 
                (<>
                    <li className='nav__item'>
                        <Link className='nav__link' to='/login'>
                            <FaSignInAlt className='nav__item--img'/> Login
                        </Link> 
                    </li>
                    <li className='nav__item themeToggle' onClick={toggleTheme}>
                        {(theme) ? (<FaSun className='themeToggle--icon'/>):(<FaMoon className='themeToggle--icon'/>)}
                    </li>
                </>)}
                
            </ul>
        </div>
    </div>
  )
}

export default Header