import { useContext, useRef, useState } from "react";
import { UserContext } from "./Home";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";


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

export const Update = () =>{
    const [clicked, setClicked] = useState(false)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const context = useContext(UserContext);

    const handleSubmit = () => {

        setClicked(false);

        if (context) {
            context.userDispatch({
                type: 'UPDATE', data: {

                    lastName: lastNameRef.current?.value || '',
                    email: emailRef.current?.value || '',
                    addres: addressRef.current?.value || '',
                    phone: phoneRef.current?.value || ''
                }
            })
        }


    }
    return(
        <>
        <Button onClick={() => { setClicked(true) }} variant="outlined" sx={{ backgroundColor: 'white', color: ' #40E0D0 ', border: '1px solid gray' }}>Update</Button>

        {clicked && <Modal
            open={clicked}
            onClose={() => { setClicked(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Last Name" variant="outlined" inputRef={lastNameRef} />
                    <TextField fullWidth label="Email" variant="outlined" inputRef={emailRef} />
                    <TextField fullWidth label="Address" variant="outlined" inputRef={addressRef} />
                    <TextField fullWidth label="Phone" variant="outlined" inputRef={phoneRef} />

                    <Button type='submit' variant="contained" sx={{
                        backgroundColor: 'white',
                        color: ' #40E0D0 ',
                        marginTop: '15px',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }} >Send</Button>
                </form>
            </Typography>

        </Box>
    </Modal>
    }
        </>
    )
}
export default Update