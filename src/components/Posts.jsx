import { useInfiniteQuery } from 'react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { postsApi } from '../apis/postsApi'
import Post from './Post'
import PostsLoading from './PostsLoading'
import '../styles/posts.css'

const Posts = () => {

  const {data: postsData, error, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery(['postsInfinite'], 
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
    return <h1 className='noContent'> no content </h1>;
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
              <Post postdata={lastPosts} activeDeletePost={false}/>
            </div>
          ))
        }
      </InfiniteScroll>
    </div>
  )
}

export default Posts