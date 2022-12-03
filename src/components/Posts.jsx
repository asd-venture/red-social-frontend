import { useState, useEffect } from 'react'
import Post from './Post'
import '../styles/posts.css'

const url = "http://localhost:3000/posts";

const Posts = () => {

  const [posts, setPosts] = useState();

  const getApiData = async () => {
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
    <div className='posts'>
      { posts &&
          posts.map(lastPosts=>(
            <Post postdata={lastPosts} />
          ))
      }
    </div>
  )
}

export default Posts