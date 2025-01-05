import { Modal,Button,Box,TextField} from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { useRef } from "react";
import axios from "axios";


const style = {
    position: 'absolute',
    top: '20%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    background: 'white',
    border: '3px solid black',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
  };
const Login =({successLogin}:{successLogin:Function})=> {
    const context = useContext(UserContext);
    const nameRef=useRef<HTMLInputElement>(null)
    const passwordRef=useRef<HTMLInputElement>(null)
    const [open,setOpen]=useState(false)
    const[isUser, setUser]=useState(false);

   const handleLoginSubmit=async(e: React.FormEvent)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/login', {
          name: nameRef.current?.value,
          password: passwordRef.current?.value
      }
      )

      console.log(res);
      setUser(res.data.user)
      successLogin();
  
  
  if(context)
    {
        setOpen(false);
          // if(nameRef.current?.value === context?.user.firstName&&passwordRef.current?.value===context?.user.password)
          // {
                 context?.userDispatch({ type: 'CREATE', data: { firstName: nameRef.current?.value || '',  
                            password: passwordRef.current?.value || ''} })   
    }
         } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401)
          alert('מייל או סיסמא לא תקינים')
        console.log(e);
  }
}

    
    return(<>
    
     <Button sx={{position:'absolute',
                top:'5px',left:'50px' ,
                background:'black',
                color:'white',
                borderRadius:'10px',
                border:'2px solid white'}}
                 onClick={() => {setOpen(true)}}>Login</Button>
    <Modal open={open} 
           onClose={() => setOpen(false)}
           aria-labelledby="modal-modal-title" 
           aria-describedby="modal-modal-description"
            BackdropProps={{
                style: {
                  backgroundColor: 'rgba(255, 255, 255, 0)', 
                }
              }}
            >
        <Box sx={style}>        
                <TextField label='userName' inputRef={nameRef}/>
                <TextField label='password' inputRef={passwordRef}/>
                <Button variant="contained" sx={{ background:'black',
                color:'white',
                borderRadius:'10px',
                border:'2px solid white',mt: 2 }} onClick={ handleLoginSubmit} >Send </Button>
        </Box>             
    </Modal>

</>)



}
 //       successLogin();
  //       // }
  //       // else {
  //       //     context?.userDispatch({ type: 'REMOVE', data: {} });
  //       //     //successLogin();
  //       //   }
  //   }

export default Login;