import NavBar from "./NavBar"
import { Outlet } from "react-router"


const AppLayout=()=>{

return(
    <>
       <div>
                <NavBar />
                <div></div>
                <Outlet />
                <div></div>
        </div>
        
    
    </>
)


}

export default AppLayout;