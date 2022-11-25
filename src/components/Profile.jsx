import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import perfilDefault from '../assets/perfilDefault.webp'
import Nav from './common/Nav'

const Profile = () => {

    const [users, setUsers] = useState(null);

    const reqApi = async () => {
        const api = await fetch("http://localhost:3000/users");
        const usersApi = await api.json();

        console.log(usersApi);
        setUsers(usersApi)
    }
    
    const { user, isAuthenticated } = useAuth0()
  
    return (
    
        isAuthenticated && (
            <div>

                <Nav/>
                <div>
                    <img src={user.picture} onError={event=>{
                        event.target.src = perfilDefault
                        event.onerror = null
                    }} />
                    <h2> {user.name} </h2>
                    <p> {user.email} </p>
                </div>

                <div>
                    {JSON.stringify(user)}
                </div>
            </div>

        )
    )
}

export default Profile