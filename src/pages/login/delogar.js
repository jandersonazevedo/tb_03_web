import { Redirect } from 'react-router-dom'

function Deslogar(){
    sessionStorage.setItem('ID_USER', '0')
    return <Redirect to="/"/>
}

export default Deslogar