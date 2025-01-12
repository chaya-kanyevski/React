import { FormEvent, useContext, useRef, useState } from "react"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "./Home";
import axios, { AxiosError } from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'linear-gradient(50deg, #40E0D0 50%,  #D3D3D3 80%)',
    border: '3px solid #40E0D0 ',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
  };


const Login = ({ onLoginSuccess }: { onLoginSuccess: Function }) =>{

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [clicked, setClicked] = useState(false)
    const context = useContext(UserContext);
    const [user, setUser] = useState({})

    const handleSubmit = async (e: FormEvent) =>{
      e.preventDefault();
      try{
        const res = await axios.post('http://localhost:3000/api/user/login', {
          firstName: nameRef.current?.value,
          password: passwordRef.current?.value
        })
        console.log(res);
        setUser(res.data.user)
        onLoginSuccess();
        context?.userDispatch({ type: 'CREATE', data: { firstName: nameRef.current?.value || '', password: passwordRef.current?.value || '' } })
        setClicked(false);
      }catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401)
          alert('מייל או סיסמא לא תקינים');
        console.log(e);
        setClicked(false);
      }
    }

    
    return (
        <>
         <Button onClick={() => setClicked(true)} variant="outlined" sx={{ backgroundColor: 'white', color: ' #40E0D0 ', border: '1px solid gray' }}>Login</Button>
        {clicked &&

        <Modal
        open={clicked}
        onClose={() => setClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
           <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">

                    <form onSubmit={handleSubmit}>
                    <TextField fullWidth id="outlined-basic" label="FirstName" variant="outlined" inputRef={nameRef}/>
                    <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" inputRef={passwordRef}/>
                    <Button type='submit' variant="contained" endIcon={<SendIcon />}
                    sx={{
                        backgroundColor: 'white',
                        color: ' #40E0D0 ',
                        marginTop: '15px',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                    >Send</Button>
                    </form>

            </Typography>
            </Box>
         </Modal>
        }
        </>)
}
export default Login