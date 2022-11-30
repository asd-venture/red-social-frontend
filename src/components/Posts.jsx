import { useState, useEffect } from 'react'
import '../styles/posts.css'
import perfilDefault from '../assets/perfilDefault.webp'

const url = "http://localhost:3000/posts";

const Posts = () => {

  const [posts, setPosts] = useState();
  const [isActive, setIsActive] = useState(false);
  
  const active = (id) => {
    const postid = 'postid';
    return window[postid+id] = 'hola';
  }
  active("1");
  console.log(postid1);


  const getApiData = async () => {
      const response = await fetch(url)
      .then(response=> response.json())
      .catch(e => {
          console.log('e', e)
      })

      setPosts(response);
  }

  useEffect(()=>{
      getApiData();
  }, [])

  const handleClickLike = ()=>{
    setIsActive(current => !current)
  }

  return (
    <div className='posts'>
      { posts &&
          posts.map(lastPosts=>(

            <div key={lastPosts.id} className='postBox'>
                <div className='userPost'>
                  <img src={lastPosts.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>

                  <div className='nameEmail'>
                    <p>{lastPosts.username}</p>
                    <p>{lastPosts.email}</p>
                  </div>
                </div>

              <p className='contentPost'>{lastPosts.content}</p>
              <div className='LikeComment'>
                <button className={ isActive ? 'likeActive' : 'like'} 
                  onClick={handleClickLike}
                >Like</button> 
                <button>Comment</button>
              </div>
            </div>

          ))
      }
    </div>
  )
}

export default Posts