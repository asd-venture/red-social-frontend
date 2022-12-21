import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import { userEmailApi } from '../apis/usersApi'
import Nav from '../components/Nav'
import UserPosts from '../components/UserPosts'
import ToPost from '../components/ToPost'
import '../styles/profile.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Profile = () => {
    
    const { user } = useAuth0();
    let { email } = useParams();

    const selectEmail = email ? email : user.email
    const {data: userEmail, error, isLoading} = useQuery(['userEmail', selectEmail], ()=>userEmailApi(selectEmail));

    if(isLoading) return <h1> loading...</h1> 
    if(error) return <h1 className='error'>Something was wrong</h1>
    
    return (
        <div className="profile">
            <Nav/>
            <div className="profileUser">
                <img src={userEmail.picture} onError={event=>{
                    event.target.src = perfilDefault
                    event.onerror = null
                }} />
                <h2> {userEmail.username} </h2>
                <p> {userEmail.email} </p>
            </div>
            <div className="postsUser">
                { !email&&<ToPost id={userEmail.userid}/> }
                <UserPosts id={userEmail.userid} another={email ? true : false}/>
            </div>
        </div>

        )
}

export default Profile