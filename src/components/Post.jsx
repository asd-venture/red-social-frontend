import { useState, useEffect, useReducer } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postLikesApi, createLike, deleteLike } from '../apis/likesApi'
import Comments from './Comments'
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'


const Post = ({postdata, userdata}) => {
    
    const id = postdata.postid
    const {data: like, error, isLoading, refetch} = useQuery(['likeData', id], ()=> postLikesApi(id))
    const { user } = useAuth0();
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isCommentActive, setIsCommentActive] = useState(false);
    const [reducerValue, forceUpdate] = useReducer( x => x + 1 , 0)

    const addData = ()=>{
        const body = {
            useridlike: userdata.userid,
            postidlike: postdata.postid
        }
        createLike(body).then(response=>refetch())

    }


    const deleteLikeUser = ()=>{
        const currentLike = like.find(l=>l.email == user.email)
        deleteLike(currentLike.likeid).then(reponse=>refetch())
    }
    
    const handleClickLike = ()=>{        
        setIsLikeActive(current => !current)
        isLikeActive ? deleteLikeUser() : addData()
    }

    const handleClickComment = ()=>{        
        setIsCommentActive(current => !current)
    }

    // const getUserLikes = async()=>{
    //     const id = userdata.userid
    //     const url = `http://localhost:3000/likes/user/${id}`;
    //     const response = await fetch(url)
    //     const data = await response.json()

    //     for(const userLikes in data){
    //         if(userLikes.postidlike==postdata.postid){
    //             setIsLikeActive(true)
    //         }
    //     }
    // }

    // for(userLikes in like){
    //     console.log(userLikes)
    //     userLikes.email==user.email?
    //         setIsLikeActive(true)
    //         :
    //         null
    // }

    
    // const getPostLikes = async ()=>{
    //     const id = postdata.postid
    //     const url = `http://localhost:3000/likes/post/${id}`;
    //     const response = await fetch(url)
    //     const data = await response.json()


    //     setLike(data.likes)
    // }

    // const {data: likeId, error, isLoading} = useQuery('likeData', likesApi)
    
    // if(likeId){
    //     likeId.map(likes=>{
    //         if(userdata.userid==likes.useridlike && postdata.postid==likes.postidlike){
    //             setLike(likes)
    //             userdata &&(getUserLikes())
    //             postdata &&(getPostLikes())
    //         }
    //     })
    // }

    useEffect(()=>{
        for (const userLike in like){
            if(like[userLike].email==user.email){

                setIsLikeActive(true)
            }
        }
    }, [like]);

    if(isLoading) return <h1> </h1>

    return (
        userdata &&(
            <div className='postBox'>  
                <Link to={postdata.email == user.email ? '/profile' : '/profile/'+postdata.userid} className='userPost'>
                    <img src={postdata.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>
    
                    <div className='nameEmail'>
                        <p className='name' >{postdata.username}</p>
                        <p className='email'>{postdata.email}</p>
                    </div>
                </Link>
                <p className='contentPost'>{postdata.content}</p>
                <div className='LikeComment'>
                    {
                    like&&(
                        <button className={ isLikeActive ? 'likeActive' : 'like'} 
                            onClick={handleClickLike}
                        >Like { like && <pre> {Object.keys(like).length} </pre> } </button> 
                        
                    )
                    }
                    <button onClick={handleClickComment}>Comment</button>
                </div>
                { 
                    isCommentActive &&(
                        <Comments className='hide' postdata={postdata} userdata={userdata}/>
                    )
                }
            </div>
        )
    )
}

export default Post