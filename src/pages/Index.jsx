import { useState } from 'react'
import Terms from '../components/Terms'
import '../styles/index.css'
import Logo from '/logoBrain.png'

const Index = () => {

    const [isActive, setIsActive] = useState(false);

    const handleClick = ()=>{        
        setIsActive(current => !current)
    }

    return (
        <div className='index'>
            <div className={isActive ? 'image' :'onlyImage'}> 
                <h1> BrightRead</h1>
                <img src={Logo} alt="Logo de la pagina"/>
                <button onClick={handleClick}> {isActive ? 'return':'Continue'} </button>
            </div>
                {isActive &&(
                    <div className='aceptTerms'>
                        <Terms/>
                        <button onClick={handleClick}> {isActive ? 'return':'Continue'} </button>
                    </div>
                )}
            </div>
    )
}

export default Index