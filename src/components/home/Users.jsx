import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom"
import { useQuery } from 'react-query'
import { usersApi } from '../../apis/usersApi'
import Load from '../Load'
import '../../styles/home/users.css'
import perfilDefault from '../../assets/perfilDefault.webp'

const Users = () => {

    const { user } = useAuth0();
    const {data: users, error, isLoading} = useQuery('userData', usersApi);
    
    if(error) return <h1 className='error'>Something was wrong</h1>
    
    if(isLoading) return (
        <div className='users'> 
            <div className='other'>
                <h1>Other Users</h1>
            </div>
            <div className='boxUsers'>
                <div className='usersLoad'>
                    <Load/>
                </div>
            </div>
        </div>
        )

    return (
        <div className='users'>
            <div className='other'>
                <h1>Other Users</h1>
            </div>
            <div className='boxUsers'>
            {
                users.map(usersProfile=>( 
                    user.email == usersProfile.email ? '' 
                        :
                    <Link to={'/profile/'+usersProfile.email} key={usersProfile.email} className='otherUsers'>
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