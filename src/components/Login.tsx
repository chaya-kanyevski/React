import { useContext, useRef, useState } from "react"
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "./Home";

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

    const handleSubmit = () =>{
        if (context) {
            setClicked(false)
            if (context.user.firstName === nameRef.current?.value && context.user.password == passwordRef.current?.value) {
              context.userDispatch({ type: 'CREATE', data: { firstName: nameRef.current?.value || '', password: passwordRef.current?.value || '' } })
              onLoginSuccess()
            }
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
        </>
    )
}
export default Login