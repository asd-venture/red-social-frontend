import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from "react-router-dom"
import Nav from './common/Nav'
import UserPosts from './UserPosts'
import ToPost from './ToPost'
import '../styles/profile.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Profile = () => {
    
    const [ users, setUsers ] = useState();
    const [ anotherUsersId, setAnotherUsersId ] = useState();

    const { user } = useAuth0();
    let { id } = useParams();

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
        users && (
            id ?
                <div className="profile">
                    <Nav/>
                    { users.map(anotherUser=>(
                        id == anotherUser.id ?
                        <div className="profileUser">
                            <img src={anotherUser.picture} onError={event=>{
                                event.target.src = perfilDefault
                                event.onerror = null
                            }} />
                            <h2> {anotherUser.name} </h2>
                            <p> {anotherUser.email} </p>
                        </div>
                        :
                        null
                    ))
                    }
                    <UserPosts id={id} another={true}/>
                </div>
                :
                <div className="profile">
                    <Nav/>

                    <div className="profileUser">
                        <img src={user.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }} />
                        <h2> {user.name} </h2>
                        <p> {user.email} </p>
                    </div>
                    
                    {
                        users.map(anotherUser=>(
                            user.email == anotherUser.email?
                                <>
                                    <ToPost id={anotherUser.id}/>
                                    <UserPosts id={anotherUser.id} another={false}/> 
                                </>
                                :
                                    null

                        ))
                    } 
                </div>
        )
    )
}

export default Profile