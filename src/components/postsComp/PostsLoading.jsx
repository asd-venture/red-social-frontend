import React from 'react'
import '../../styles/postsComp/post.css'

const PostsLoading = () => {
  return (
    <div className='postBox'> 
      <div className='boxUserPost boxUserPostLoading'> 
        <div className='userPost'>
            <div></div>
            <div className='nameEmail'>
                <p className='name'></p>
                <p className='email'></p>
            </div>
        </div>
      </div> 
      <div className='contentPost contentPostLoading'></div>
      <div className='LikeComment LikeCommentLoading'></div>
    </div>
  )
}

export default PostsLoading