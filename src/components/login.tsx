import { Modal, Button, Box, TextField } from "@mui/material";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = ({ successLogin, typeAction,isOpen }: { successLogin: Function; typeAction: string,isOpen:boolean }) => {
  const context = useContext(UserContext);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
   const [userID, setUserId] = useState<string>()

  useEffect(() => {
    if (context?.user.id) {
      console.log("User ID updated:", context.user.id);
    }
  }, [context?.user.id]);

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const link =
        typeAction === "Sign"
          ? "http://localhost:3000/api/user/register"
          : "http://localhost:3000/api/user/login";

      const res = await axios.post(link, {
        firstName: firstnameRef.current?.value,
        password: passwordRef.current?.value,
      });

       setUserId(res.data.id);
       

      console.log(res)
      context?.userDispatch({
        type: "CREATE",
        data: { 
          id: res.data.id, 
          firstName: firstnameRef.current?.value || '',
                password: passwordRef.current?.value || ''}
      });

      console.log("User ID after dispatch:", res.data.id);
      
      alert(`${typeAction} successful`);
      successLogin();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400 || e.response?.status === 401) {
          alert(typeAction === "Sign" ? "User already exists" : "User not found");
        }  
      } else {
        console.error(e);
        alert("An unexpected error occurred.");
      }
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmitLogin}>
          <TextField label="Username" inputRef={firstnameRef} fullWidth sx={{ mb: 2 }} />
          <TextField
            label="Password"
            inputRef={passwordRef}
            type="password"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "black",
              color: "white",
              borderRadius: "10px",
              border: "2px solid white",
            }}
          >
            {typeAction}
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default Login;