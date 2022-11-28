import { useState, useEffect } from 'react'
import '../styles/posts.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Posts = () => {

  const [posts, setPosts] = useState();

  const url = "http://localhost:3000/posts";

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

            <div className='postBox'>
                <div className='userPost'>
                  <img src={lastPosts.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>

                  <div className='nameEmail'>
                    <p>{lastPosts.username}</p>
                    <p>{lastPosts.email}</p>
                  </div>
                </div>

              <p className='contentPost'>{lastPosts.content}</p>
              <div className='LikeComment'>
                <p>Like</p> 
                <p>Comment</p>
              </div>
            </div>

          ))
      }
    </div>
  )
}

export default Posts