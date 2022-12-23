import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { usersApi } from '../apis/usersApi'
import { postsApi } from '../apis/postsApi'
import Post from './Post'
import '../styles/posts.css'
import '../styles/post.css'

const Posts = () => {

  const { user } = useAuth0();
  const {data: users} = useQuery('userData', usersApi);
  const {data: posts, error, isLoading} = useQuery('postsData', postsApi)
  const [userdata, setUserdata] = useState();

  useEffect(()=>{
    for(const u in users){
      if (user.email==users[u].email) {
        setUserdata(users[u])
      }
    };
  }, [users])

  if(error) return <h1 className='error'>Something was wrong</h1>

  if(isLoading) return (
    <div className='postsLoad'> 
      <div className='postsLoading'> 
        <div>
          <div className='userPost'>
            <div className='nameEmail'></div>
          </div>
          <p className='contentPost'></p>
          <div className='LikeComment'></div>
        </div>
      </div> 
    </div>
  )

  return (
    <div className='posts' id='posts'>
      { userdata &&
          posts.map(lastPosts=>(
            <div key={lastPosts.postid}>
              <Post postdata={lastPosts} userdata={userdata}/>
            </div>
          ))
      }
    </div>
  )
}

export default Posts