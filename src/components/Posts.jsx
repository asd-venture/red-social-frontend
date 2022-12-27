import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery, useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { userEmailApi } from '../apis/usersApi'
import { postsApi } from '../apis/postsApi'
import Post from './Post'
import PostsLoading from './PostsLoading'
import Load from './Load'
import '../styles/posts.css'

const Posts = () => {

  const { user } = useAuth0();
  // const [posts, setPosts] = useState([])
  const [load, setLoad] = useState(1)

  const {data: users} = useQuery(['userEmailData', user.email], ()=>userEmailApi(user.email));
  const {data: posts, error, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery(['postsInfiniteData'], ({pageParam=1})=>postsApi(pageParam), {
    getNextPageParam: (lastPage)=>{
      return true;
    },
  });

  // useEffect(()=>{
  //   postsApi(load)
  //   .then(data=>{
  //     setPosts(preData=>preData.concat(data));
  //   });
  // }, [load])

  if(error) return <h1 className='error'>Something was wrong</h1>
  
  if(isLoading) return <PostsLoading/>

  return (
    <div className='posts' id='posts'>
      <InfiniteScroll 
        dataLength={posts.length} 
        hasMore={true} 
        next={()=>fetchNextPage()} 
        loader={<Load/>}
      >
        { posts?.pages[0].map((lastPosts, index)=>(
            <div key={index}>
              <Post postdata={lastPosts} userdata={users}/>
            </div>
          ))
        }
      </InfiniteScroll>
    </div>
  )
}

export default Posts