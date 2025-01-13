import { User, userReducer } from "./user";
import  { useReducer } from "react";
import { UserContext } from "./userContext";
import Login from "./login";
import { useState } from "react";
import Username_avatar from "./username_avatar";
import { Button } from "@mui/material";
   

const HomePage=()=>{

    const initialUser:User={
        id:'',
        firstName:'',
        lastName:'',
        mail:'',
        password:'',
        address:'',
        phone:''
    }
    const[isLogin, setIsLogin]=useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, userDispatch] = useReducer(userReducer, initialUser);
    const [type, setType] = useState('Login');
   

    const handleLoginSuccess = () => {
        setIsLogin((prev) => {
          if (!prev) setIsLoginOpen(false);
          return !prev;
        });
      }

return(<>
<UserContext.Provider value={{ user, userDispatch }}>
        {!isLogin&&(
            <>
             <Button variant="contained"
                color="secondary"
                sx={{ mx: 2 }}
                onClick={()=>{setIsLoginOpen(true); setType('Sign'); }}
                >sign</Button>
     
             <Button variant="contained"
                color="secondary"
                sx={{ mx: 2 }}
                onClick={()=>{setIsLoginOpen(true); setType('Login'); }}
                >login</Button>
            </>)
        }    

        {isLoginOpen&& <Login successLogin={handleLoginSuccess} typeAction={type} close={()=>setIsLoginOpen(false)} />}
         
                 
        {isLogin && <Username_avatar/>}


    
        </UserContext.Provider>

</>)
}
export default HomePage;