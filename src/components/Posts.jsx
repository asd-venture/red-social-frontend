import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { userEmailApi } from '../apis/usersApi'
import { postsApi } from '../apis/postsApi'
import Post from './Post'
import PostsLoading from './PostsLoading'
import '../styles/posts.css'

const Posts = () => {

  const { user } = useAuth0();

  const {data: users} = useQuery(['userEmailData', user.email], ()=>userEmailApi(user.email));
  const {data: postsData, isLoading, error, hasNextPage, fetchNextPage} = useInfiniteQuery(['postsInfinite'], 
    ({pageParam=1})=>postsApi(pageParam),
    {
      getNextPageParam: (lastPage)=>{
        if(lastPage.page===lastPage.total_pages) return false
        return lastPage.page+1;
      },
    }
  );

  const posts = postsData?.pages.reduce((prevPosts, page)=>prevPosts.concat(page.results), []) ?? [];

  if(!isLoading && posts.length===0){
    return <h1> nada </h1>;
  }

  if(error) return <h1 className='error'>Something was wrong</h1>
  
  return (
    <div className='posts' id='posts'>
      <InfiniteScroll 
        dataLength={posts.length} 
        hasMore={hasNextPage | isLoading} 
        next={()=>fetchNextPage()} 
        loader={<PostsLoading/>}
      >
        { posts.map(lastPosts=>(
            <div key={lastPosts.postid}>
              <Post postdata={lastPosts} userdata={users}/>
            </div>
          ))
        }
      </InfiniteScroll>
    </div>
  )
}

export default Posts