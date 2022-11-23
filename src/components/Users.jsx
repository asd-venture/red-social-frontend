import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/users.css'

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
                    <p key={usersProfile.username}>
                        {user.nickname == usersProfile.username ? '' : usersProfile.username}
                    </p>
                ))
            }
        </div>
    )
}

export default Users