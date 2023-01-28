import { useAuth0 } from '@auth0/auth0-react'
import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { postsUserApi } from '../../apis/postsApi'
import Post from '../postsComp/Post'
import PostsLoading from '../postsComp/PostsLoading'
import '../../styles/profile/userPosts.css'

const UserPosts = ({id, another}) => {

  const { user } = useAuth0();
  const {data: postsUserData, error, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery(['postsUserInfinite', id],
  ({pageParam=1})=>postsUserApi(id, pageParam),
    {
      getNextPageParam: (lastPage)=>{
        if(lastPage.page===lastPage.total_pages) return false
        return lastPage.page+1;
      },
    }
  );

  const postsUser = postsUserData?.pages.reduce((prevPosts, page)=>prevPosts.concat(page.results), []) ?? [];
  
  if(error) return <h1 className='error'>Something was wrong</h1>

  return (
    <div className={another?'anotherUserPosts':'userPosts'}>
      {
      !isLoading && postsUser.length===0?
        <h1> The user does not have any post</h1>
          :
        <InfiniteScroll 
          dataLength={postsUser.length} 
          hasMore={hasNextPage | isLoading} 
          next={()=>fetchNextPage()} 
          loader={<PostsLoading/>}
        >
        { postsUser.map(lastPosts=>(
            <Post key={lastPosts.postid} postdata={lastPosts} activeDeletePost={user.nickname==lastPosts.username?true:false}/>
          ))
        }
        </InfiniteScroll>
      }
    </div>
  )
}

export default UserPosts