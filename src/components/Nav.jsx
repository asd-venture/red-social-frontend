import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from './LogoutButton'
import '../styles/nav.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Nav = () => {

    const { user } = useAuth0()

    return (
        <nav>
            <div>
                <Link to="/profile" className='navProfile'>
                    <img src={user.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }} 
                    />
                    <p> {user.nickname} </p>
                </Link>
            </div>

            <div>
                <NavLink to='/home' className='linkNav' activeclassname='active'>
                    Home
                </NavLink>
                <NavLink to='/profile' className='linkNav' activeclassname='active'>
                    Profile
                </NavLink>
            </div>

            <div>
                <LogoutButton/>
            </div>
        </nav>
    )
}

export default Nav