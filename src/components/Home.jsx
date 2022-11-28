import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './common/Nav'
import Users from './Users'
import NewPost from './NewPost'
import Posts from './Posts'
import '../styles/home.css'

const Home = () => {

  const [id, setId] = useState();
  const { user } = useAuth0();

  const data = {
    username: user.nickname,
    email: user.email,
    picture: user.picture
  }
  const url = "http://localhost:3000/users";
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
  
  return (
    <div>
      {id &&
        <div className='home'>
          <Nav userid={id.user.id}/>
          <NewPost/>
          <Posts/>
          <Users/>
        </div>
      }
    </div>
  )
}

export default Home