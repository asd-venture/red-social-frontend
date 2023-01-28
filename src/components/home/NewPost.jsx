import React from 'react'
import '../../styles/home/newPost.css'
import { Link } from "react-router-dom"

const NewPost = () => {

  return (
    <div className='newPost'>
        <Link to='/profile' className='linkNav'>
            <h1>Create New Post</h1>
        </Link>
    </div>
  )
}

export default NewPost