import { useState, useEffect } from 'react'
import Post from './Post'
import '../styles/userPosts.css'

const UserPosts = ({id, another}) => {

  const [posts, setPosts] = useState();

  const getApiData = async () => {
      const url = `http://localhost:3000/posts/user/${id}`;
      const response = await fetch(url)
      .then(response=> response.json())
      .catch(e => {
          console.log('e', e)
      })

      setPosts(response);
  }

  useEffect(()=>{
      getApiData();
  }, [])

          
  return (
    <div className={another?'anotherUserPosts':'userPosts'}>
  
      {posts &&
        posts.message != 'The user does not have any post'?
          posts.map(lastPosts=>(
            <Post postdata={lastPosts} />
            ))
          :
          <h1> The user does not have any post</h1>
      }
    </div>
  )
}

export default UserPosts