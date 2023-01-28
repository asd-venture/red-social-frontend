import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { createUser } from '../apis/usersApi'
import Nav from '../components/Nav'
import Users from '../components/home/Users'
import NewPost from '../components/home/NewPost'
import Posts from '../components/home/Posts'
import '../styles/home/home.css'

const Home = () => {

  const { user } = useAuth0();

  const data = {
    username: user.nickname,
    email: user.email,
    picture: user.picture
  }

  useEffect(()=>{
    createUser(data)
  }, [])

  return (
    <div className='home'>
      <Nav/>
      <NewPost/>
      <Posts/>
      <Users/>
    </div>
  )
}

export default Home