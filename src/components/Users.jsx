import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/users.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Users = () => {

    const [users, setUsers] = useState();
    const { user } = useAuth0();

    const url = "http://localhost:3000/users";

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
        <div>
            { users &&
                users.map(usersProfile=>( 
                    user.email == usersProfile.email ? '' 
                        : 
                    <div key={usersProfile.email} className='otherUsers'>
                        <img src={usersProfile.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>
                        <p> {usersProfile.username} </p>        
                    </div>
                ))
            }
        </div>
    )
}

export default Users