import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Post from './Post'
import '../styles/userPosts.css'

const UserPosts = ({id, another}) => {

  const { user } = useAuth0();
  const [posts, setPosts] = useState();
  const [userdata, setUserdata] = useState();

  const getApiData = async () => {
      const url = `http://localhost:3000/posts/user/${id}`;
      const response = await fetch(url)
      .then(response=> response.json())
      .catch(e => {
          console.log('e', e)
      })

      setPosts(response);
  }

  const getUserId = async () => {
    const url = "http://localhost:3000/users";
    const response = await fetch(url)
    .then(response=> response.json())
    .then(response=> response.map((users)=>(
        user.email==users.email?
        setUserdata(users)
            :
        null
    )))
    .catch(e => {
        console.log('e', e)
    })
  }

  useEffect(()=>{
      getApiData();
      getUserId();
  }, [])

          
  return (
    <div className={another?'anotherUserPosts':'userPosts'}>
  
      {posts &&
        posts.message != 'The user does not have any post'?
          posts.map(lastPosts=>(
            <Post key={lastPosts.postid} postdata={lastPosts} userdata={userdata} />
            ))
          :
          <h1> The user does not have any post</h1>
      }
    </div>
  )
}

export default UserPosts