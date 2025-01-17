import { useContext, useRef, useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "./Home";
import { Box, Modal, TextField, Typography } from "@mui/material";
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

const SignIn = ({ onLoginSuccess }: { onLoginSuccess: Function }) => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [clicked, setClicked] = useState(false)
  const context = useContext(UserContext);
  const [user, setUser] = useState({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const res = await axios.post('http://localhost:3000/api/user/register', {
        email : emailRef.current?.value,
        password: passwordRef.current?.value
      })

      console.log(res);
      console.log('Response:', res.data);
      setUser(res.data.user)
      onLoginSuccess();
      setClicked(false)
      context?.userDispatch({ type: 'CREATE', data: { id: res.data.userId, email: emailRef.current?.value || '', password: passwordRef.current?.value || '' } })
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401)
            alert('מייל או סיסמא לא תקינים');
          console.log(e);;
    }
  }

  return (<>
    <Button onClick={() => { setClicked(true) }} variant="outlined" sx={{ backgroundColor: 'white', color: ' #40E0D0 ', border: '1px solid gray' }}>Register</Button>
    {clicked &&
      <Modal
        open={clicked}
        onClose={() => { setClicked(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form onSubmit={handleSubmit}>
              <TextField type="email" fullWidth label="Email" variant="outlined" inputRef={emailRef} />
              <TextField type="password" fullWidth label="Password" variant="outlined" inputRef={passwordRef} />
              <Button type='submit' variant="contained" endIcon={<SendIcon />} sx={{
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
  export default SignIn
