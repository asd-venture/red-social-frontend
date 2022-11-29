import { useState, useEffect } from 'react'
import '../styles/userPosts.css'

const UserPosts = ({id, another}) => {

  const [posts, setPosts] = useState();

  console.log(id);

  const url = `http://localhost:3000/posts/user/${id}`;

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
    <div className={another?'anotherUserPosts':'userPosts'}>
  
      {posts &&
        posts.message != 'The user does not have any post'?
          posts.map(lastPosts=>(
            
            <div key={lastPosts.id} className='postBox'>
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
          :
          <h1> The user does not have any post</h1>
      }
    </div>
  )
}

export default UserPosts