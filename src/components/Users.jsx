import { useState, useEffect } from 'react'

const Users = () => {

    const [users, setUsers] = useState(null);

    const url = "http://localhost:3000/users";
    useEffect(()=>{
        fetch(url)
        .then(response=> response.json())
        .then(json => {
            setUsers(json)
        })
        .catch(e => {
            console.log('e', e)
        })
    }, [])

    return (
        <div>
            { 
            users ?
                users.forEach(item=>{    
                    <div>
                        <p content={item.username}>
                        {console.log(item.username)}   
                             
                        </p>
                    </div> 
                
                })
                :
                <div> Cargando </div>
            }
        </div>
    )
}

export default Users