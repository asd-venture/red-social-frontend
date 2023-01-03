import { useState, useEffect, useReducer } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { postLikesApi, createLike, deleteLike } from '../apis/likesApi'
import Comments from './Comments'
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Post = ({postdata, userdata}) => {
    
    const { user } = useAuth0();
    const {data: like, error, isLoading, refetch} = useQuery(['likesData', postdata.postid], ()=> postLikesApi(postdata.postid))

    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isCommentActive, setIsCommentActive] = useState(false);

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

    useEffect(()=>{
        for (const userLike in like){
            if(like[userLike].email==user.email){
                setIsLikeActive(true)
            }
        }
    }, [like]);

    return (
            <div className='postBox'>
                <Link to={postdata.email == user.email ? '/profile' : '/profile/'+postdata.email} className='userPost'>
                    <img src={postdata.picture} onError={event=>{
                            event.target.src = perfilDefault
                            event.onerror = null
                        }}/>
    
                    <div className='nameEmail'>
                        <p className='name' >{postdata.username}</p>
                        <p className='email'>{postdata.email}</p>
                    </div>
                </Link>
                <div className='contentPost'>
                    {postdata.urlimage && <img src={postdata.urlimage}/>} 
                    {postdata.content && <p>{postdata.content}</p>} 
                </div>
                <div className='LikeComment'>
                    { isLoading&&(
                        <button className='likeDesactive' disabled={true}> Like </button>
                    )}
                    { error&&(
                        <button className='likeDesactive' disabled={true}> Like </button>
                    )}
                    { like&&(
                        <button className={ isLikeActive ? 'likeActive' : 'like'} 
                            onClick={handleClickLike}
                        >Like { like && <pre> {Object.keys(like).length} </pre> } </button> 
                        
                    )}
                    <button className='buttonComment' onClick={handleClickComment}>Comment</button>
                </div>
                { 
                    isCommentActive &&(
                        <Comments className='hide' postdata={postdata} userdata={userdata}/>
                    )
                }
            </div>
    )
}

export default Post