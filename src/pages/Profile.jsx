import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from "react-router-dom"
import Nav from '../components/Nav'
import UserPosts from '../components/UserPosts'
import ToPost from '../components/ToPost'
import '../styles/profile.css'
import perfilDefault from '../assets/perfilDefault.webp'

const url = "http://localhost:3000/users";

const Profile = () => {
    
    const [ users, setUsers ] = useState();

    const { user } = useAuth0();
    let { id } = useParams();


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
                        id == anotherUser.userid ?
                            <div key={anotherUser.userid} className="profileUser">
                                <img src={anotherUser.picture} onError={event=>{
                                    event.target.src = perfilDefault
                                    event.onerror = null
                                }} />
                                <h2> {anotherUser.username} </h2>
                                <p> {anotherUser.email} </p>
                            </div>
                            :
                            null
                    ))
                    }
                    <div key={users.map((anotherUser)=>(anotherUser.userid))} className="postsUser">
                        <UserPosts id={id} another={true}/>
                    </div>
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
                            <div key={anotherUser.userid} className="postsUser">
                                <ToPost id={anotherUser.userid}/>
                                <UserPosts id={anotherUser.userid} another={false}/> 
                            </div>
                            :
                                null
                        ))
                    } 
                </div>
        )
    )
}

export default Profile