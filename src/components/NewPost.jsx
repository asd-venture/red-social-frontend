import React from 'react'
import '../styles/newPost.css'
import {
    BrowserRouter as Router,
    NavLink
  } from "react-router-dom"

const NewPost = () => {
  return (
    <div className='newPost'>
        <NavLink to='/Profile' className='linkNav' activeclassname='active'>
            <h1>Create New Post</h1>
        </NavLink>
    </div>
  )
}

export default NewPost