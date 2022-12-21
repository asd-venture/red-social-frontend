import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from 'react-query'
import { userEmailApi } from '../apis/usersApi'
import { postsUserApi } from '../apis/postsApi'
import Post from './Post'
import '../styles/userPosts.css'

const UserPosts = ({id, another}) => {

  const { user } = useAuth0();
  const {data: userEmail} = useQuery(['userEmailData', user.email], ()=>userEmailApi(user.email));
  const {data: postsUser, error, isLoading} = useQuery(['postsUserData', id], ()=>postsUserApi(id));
  
  if(isLoading) return <h1 className='loading'> loading... </h1>
  if(error) return <h1 className='error'>Something was wrong</h1>

  return (
    <div className={another?'anotherUserPosts':'userPosts'}>
      {postsUser &&
        postsUser.message != 'The user does not have any post'?
          postsUser.map(lastPosts=>(
            <Post key={lastPosts.postid} postdata={lastPosts} userdata={userEmail} confDelete={another?false:true}/>
            ))
          :
          <h1> The user does not have any post</h1>
      }
    </div>
  )
}

export default UserPosts