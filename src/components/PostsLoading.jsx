import React from 'react'
import '../styles/posts.css'
import '../styles/post.css'

const PostsLoading = () => {
  return (
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
}

export default PostsLoading