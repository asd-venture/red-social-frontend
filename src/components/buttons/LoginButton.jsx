import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = ({checked}) => {

    const {loginWithRedirect} = useAuth0();

    return (
        <button disabled={!checked} onClick={() => {loginWithRedirect()}}>
            Login
        </button>
    )
}

export default LoginButton