import { Link } from "react-router"


const NavBar=()=>{

const name='Gili';
return(
    <>
<nav style={{ position: "fixed", top: "5px", right: "50px"}}>
        <Link to='/' style={{ marginRight: "10px" }}>Home</Link>
        <Link to={`/person/${name}`} style={{ marginRight: "10px" }}>person</Link>
        <Link to='/empty'>Empty</Link> 

    </nav>
    
    </>
)

}
export default NavBar;