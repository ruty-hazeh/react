import { User, userReducer } from "./user";
import  { useReducer } from "react";
import { UserContext } from "./userContext";
import Login from "./login";
import { useState } from "react";
import Username_avatar from "./username_avatar";
import Sign from "./Sign"
   

const HomePage=()=>{

    const initialUser:User={
        firstName:'',
        lastName:'',
        mail:'',
        password:'',
        address:'',
        phone:''
    }
    const[isLogin, setIsLogin]=useState(false);
    const[isSign, setIsSign]=useState(false);
    const [user, userDispatch] = useReducer(userReducer, initialUser);

   

    const handleLoginSuccess = () => {
        setIsLogin((islog)=>!islog); 
    };

    const handleSignSuccess = () => {
        setIsSign((issi)=>!issi); 
    };

return(<>
<UserContext.Provider value={{ user, userDispatch }}>
        {!isLogin?(
            <>
             {isSign ? (
                        <Sign successSign={handleSignSuccess} />
                    ) : (
                        <Login successLogin={handleLoginSuccess} />
                    )}
              
               
             </>
         ) :(
            <Username_avatar/>

            )}
    
</UserContext.Provider>

</>)
}
export default HomePage;