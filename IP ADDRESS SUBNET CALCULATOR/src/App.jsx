import { BrowserRouter , Routes , Route } from "react-router-dom";
import SignUpPage from './Components/SignUpPage';
import Home from './Components/Home';
import ProtectedRouter from './Services/ProtectedRouter';

const App = () => {
  return (

    <BrowserRouter> 

        <Routes>

            {/* Public Routes */}
            <Route path='/login' element = {<SignUpPage/>}/>

            {/* Protected Routes */}
            <Route path='/' element={<ProtectedRouter/>}>
                <Route path='/' element = {<Home/>}/>
            </Route>

        </Routes>
        
    </BrowserRouter>
  )
}

export default App