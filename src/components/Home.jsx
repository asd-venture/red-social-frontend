import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Nav from './common/Nav'
import Users from './Users'

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
  
  return (
    <div>
        <Nav/>
        <Users/>
    </div>
  )
}

export default Home