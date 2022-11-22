import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

window.process = {
  env: {
    REACT_APP_AUTH0_DOMAIN: 'brightread.us.auth0.com',
    REACT_APP_AUTH0_CLIENT_ID: 'qWdNI80iZov8kbnnFtFWYj3QTIjvWDeD'
  }
}

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain} 
      clientId={clientId} 
      redirectUri={'http://localhost:5173/home'}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
