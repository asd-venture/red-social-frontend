import React from 'react'
import '../styles/error404.css'
import Logo from '/logoBrain.png'

const Error404 = () => {
  return (
      <div className='error'>
        <img src={Logo} alt="Logo de la pagina"/>
        <div>
          <h1> Error 404 </h1>    
          <p> Direccion no encontrada </p>
        </div>
    </div>
  )
}

export default Error404