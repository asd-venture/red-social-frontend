import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider 
        domain={domain} 
        clientId={clientId} 
        redirectUri={'http://localhost:5173/home'}
      >
        <App />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
