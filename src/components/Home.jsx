import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './common/Nav'
import Users from './Users'
import Posts from './Posts'
import '../styles/home.css'

const Home = () => {

  const { user } = useAuth0();

  const data = {
    username: user.nickname,
    email: user.email,
    picture: user.picture
  }
  const url = "http://localhost:3000/users";
  useEffect(()=>{
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      console.log('response', json);
    })
    .catch(e => {
      console.log('e', e);
    })
  }, [])
  
  return (
    <div className='home'>
        <Nav/>
        <div className='article'>
          <Posts/>
          <Users/>
        </div>
    </div>
  )
}

export default Home