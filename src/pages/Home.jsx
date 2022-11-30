import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from '../components/common/Nav'
import Users from '../components/Users'
import NewPost from '../components/NewPost'
import Posts from '../components/Posts'
import Loading from '../components/Loading'
import '../styles/home.css'

const url = "http://localhost:3000/users";

const Home = () => {

  const [id, setId] = useState();
  const { user } = useAuth0();

  const data = {
    username: user.nickname,
    email: user.email,
    picture: user.picture
  }
  const apiData = async ()=>{
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(e => {
      console.log('e', e);
    })

    setId(response);
  }

  useEffect(()=>{
    apiData();
  }, [])

  if (id == undefined) return <Loading/>
  
  return (
    <div>
      {id &&
        <div className='home'>
          <Nav/>
          <NewPost />
          <Posts/>
          <Users/>
        </div>
      }
    </div>
  )
}

export default Home