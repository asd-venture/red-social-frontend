import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Post from './Post'
import '../styles/posts.css'

const url = "http://localhost:3000/posts";

const Posts = () => {

  const { user } = useAuth0();
  const [posts, setPosts] = useState();
  const [userdata, setUserdata] = useState();

  const getApiData = async () => {
      const response = await fetch(url)
      const data = await response.json()

      setPosts(data);
  }

  const getUserId = async () => {
    const url = "http://localhost:3000/users";
    const response = await fetch(url)
    const data = await response.json()

    data.forEach(users => {
      if (user.email==users.email) {
        setUserdata(users)
      }
    });
  }

  useEffect(()=>{
    getApiData();
    getUserId();
  }, [])

  return (
    <div className='posts'>
      { posts &&
          userdata &&
            posts.map(lastPosts=>(
              <div  key={lastPosts.postid}>
                <Post postdata={lastPosts} userdata={userdata}/>
              </div>
            ))
      }
    </div>
  )
}

export default Posts