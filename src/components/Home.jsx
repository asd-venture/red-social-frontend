import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './common/Nav'
import Profile from './Profile'
import LogoutButton from './common/LogoutButton'

const Home = () => {

  const { user } = useAuth0();

    const data = {
      username: user.nickname,
      email: user.email,
      fullname: user.name
    }
    const url = "http://localhost:3000/users";
    fetch(url, {
      method: 'POST',
      mode:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    })
    .then(response => {
      console.log('response', response)
    })
    .catch(e => {
      console.log('e', e)
    })
  return (
    <div>
        <Nav/>
    </div>
  )
}

export default Home