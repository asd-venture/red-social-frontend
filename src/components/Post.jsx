import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { userEmailApi } from '../apis/usersApi'
import { postLikesApi, createLike, deleteLike } from '../apis/likesApi'
import Comments from './Comments'
import '../styles/post.css'
import perfilDefault from '../assets/perfilDefault.webp'

const Post = ({postdata, deletePost}) => {
    
    const { user } = useAuth0();
    const {data: userdata} = useQuery(['userEmailData', user.email], ()=>userEmailApi(user.email));
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

    return (postdata &&
                <div className='postBox'>
                    <Link to={postdata.email == user.email ? '/profile' : '/profile/'+postdata.email} className='userPost'>
                        <img src={postdata.picture} onError={event=>{
                                event.target.src = perfilDefault
                                event.onerror = null
                            }}/>
        
                        <div className='nameEmail'>
                            <p className={postdata.email == user.email ?'name logUser': 'name'} >{postdata.username}</p>
                            <p className={postdata.email == user.email ?'email logUser': 'email'}>{postdata.email}</p>
                        </div>
                    </Link>
                    <div className='contentPost'>
                        {postdata.content && <p>{postdata.content}</p>} 
                        {postdata.urlimage && <img src={postdata.urlimage}/>} 
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
                            <Comments className='hide' postdata={postdata}/>
                        )
                    }
                </div>
    )
}

export default Post