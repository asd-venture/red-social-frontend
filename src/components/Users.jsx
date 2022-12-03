import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom"
import '../styles/users.css'
import perfilDefault from '../assets/perfilDefault.webp'

const url = "http://localhost:3000/users";

const Users = () => {

    const [users, setUsers] = useState();
    const { user } = useAuth0();


    const getApiData = async () => {
        const response = await fetch(url)
        .then(response=> response.json())
        .catch(e => {
            console.log('e', e)
        })

        setUsers(response);
    }

    useEffect(()=>{
        getApiData();
    }, [])

    return (
        <div className='users'>
            <div className='other'>
                <h1>Other Users</h1>
            </div>
            <div className='boxUsers'>
                { users &&
                    users.map(usersProfile=>( 
                        user.email == usersProfile.email ? '' 
                            :
                        <Link to={'/profile/'+usersProfile.userid} key={usersProfile.email} className='otherUsers'>
                            <img src={usersProfile.picture} className='usersPerfilPicture' onError={event=>{
                                event.target.src = perfilDefault
                                event.onerror = null
                            }}/>
                            <p> {usersProfile.username} </p>        
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Users