import { useState } from 'react'
import '../styles/terms.css'
import LoginButton from '../components/LoginButton'


const Terminos = () => {

  const [checked, setChecked] = useState(false);

  const handleChange = ()=>{
    setChecked(!checked)
  }

  return (
    <div className='terms'>
        <h1> Bienvenido! </h1>
        <div className='listaIngresar'>
          <h3> Antes de ingresar a tu cuenta tienes que cumplir estos terminos </h3>
          <ul> 
              <li> Pasarle Bien </li>
              <li> No ser toxico </li>
              <li> Hacer muchos amigos </li>
              <li> Divertirse en todo momento </li>
              <li> Compartir cosas interesantes </li>
          </ul>
        </div>
        <div className='divAccept'>
          <input type="checkbox" checked={checked} onChange={handleChange} id="accept" className='boxAccept' />
          <label htmlFor="accept">Aceptar terminos</label>
        </div>
        <LoginButton checked={checked}/>
    </div>
  )
}

export default Terminos