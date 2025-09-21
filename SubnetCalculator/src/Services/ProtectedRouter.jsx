import { Outlet , Navigate} from "react-router-dom"

const ProtectedRouter = () => {

    const auth = localStorage.getItem("loggedIn");
    
    return auth ? <Outlet/> : <Navigate to={"/login"} />
}

export default ProtectedRouter