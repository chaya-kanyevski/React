import { FormEvent, use, useRef, useState } from "react"
import { Box, Button, Modal, TextField, Typography, useTheme } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "../layout/Layout";
import axios from "axios";

const Login = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
    const theme = useTheme();
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: `linear-gradient(50deg, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 80%)`,
        border: `3px solid ${theme.palette.primary.main}`,
        boxShadow: 24,
        borderRadius: theme.shape.borderRadius * 2,
        p: 4,
    };

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [clicked, setClicked] = useState(false)
    const context = use(UserContext);
    const [user, setUser] = useState({})

    const validate = () => {
      if(nameRef.current?.value === '' || passwordRef.current?.value === '') {
        return false
      }
      return true
    }

    const handleSubmit = async (e: FormEvent) =>{
      e.preventDefault();
      if(!validate()){
        alert('Please fill all the fields')
        return;
      }
      try{
        const res = await axios.post('http://localhost:3000/api/user/login', {
          name: nameRef.current?.value,
          password: passwordRef.current?.value
        })
        setUser(res.data.user)
        onLoginSuccess();

        context?.userDispatch({ type: 'CREATE', data: { 
          id: res.data.user.id, 
          firstName: nameRef.current?.value || '',
          lastName: res.data.user.lastName,
          password: passwordRef.current?.value || '' ,
          email: res.data.user.email, 
          address: res.data.user.address,
          phone: res.data.user.phone

        } })
        setClicked(false);
      }catch (error : any) {
          const status = error.response?.status;
          switch(status) {
              case 400:alert('Unauthorized. Please log in again.');break;
              case 401:alert('Invalid name or password. Please check the details you entered.');break;
              case 403:alert('Forbidden. You do not have permission to perform this action.');break;
              case 404:alert('User not found. Please try again.');break;
              default: alert('An error occurred. Please try again.')
            }
          console.error('Error login user:', error);
          setClicked(false);
      }
    }

    return (
        <>
         <Button 
            onClick={() => setClicked(true)} 
            variant="outlined" 
            sx={{ backgroundColor: 'white', color: '#FFD5AD', border: '1px solid gray',marginRight: 2 }}>
            Login
         </Button>
        {clicked &&

        <Modal open={clicked} onClose={() => setClicked(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
           <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">

                    <form onSubmit={handleSubmit}>
                    <TextField type="text" fullWidth id="outlined-basic-name" label="Name" variant="outlined" inputRef={nameRef}/>
                    <TextField type="password" fullWidth id="outlined-basic-password" label="Password" variant="outlined" inputRef={passwordRef}/>
                    <Button 
                        type='submit' 
                        variant="contained" 
                        endIcon={<SendIcon />}
                        sx={{
                            backgroundColor: '#FFD5AD',color: '#8B4513',marginTop: '15px',
                            '&:hover': {backgroundColor: '#FFC69B',},}}>
                        Send
                    </Button>
                    </form>
            </Typography>
            </Box>
         </Modal>
        }
        </>)
}
export default Login