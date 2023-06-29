import Home from "./Components/Home";
import { BrowserRouter as Router, Routes ,Route} from "react-router-dom"
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
import { useContext, useEffect } from "react";

function App() {
  const {user,setUser,isAuthenticated,setIsAuthenticated} = useContext(Context);

  useEffect(() => {
    
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false)
      
    })
    
  }, [user]);
  return (
   <Router>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
      <Toaster/>
   </Router>
  );
}

export default App
