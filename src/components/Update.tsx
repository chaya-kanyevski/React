import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./Home";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";


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
    const firstNameRef = useRef<HTMLInputElement>(null)    
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const context = useContext(UserContext);

    const handleSubmit = async(e : FormEvent) => {

        e.preventDefault()
        setClicked(false);
        console.log('User ID:', context?.user.id);
        console.log('First Name:', firstNameRef.current?.value);
        console.log('Last Name:', lastNameRef.current?.value);
        console.log('Email:', emailRef.current?.value);
        console.log('Address:', addressRef.current?.value);
        console.log('Phone:', phoneRef.current?.value);
        try {
            const res = await axios.put('http://localhost:3000/api/user', {
                id: context?.user.id,
                firstName : firstNameRef.current?.value || context?.user.firstName || '',
                lastName : lastNameRef.current?.value || context?.user.lastName || '',
                email : emailRef.current?.value || context?.user.email || '',
                address : addressRef.current?.value || context?.user.address || '',
                phone : phoneRef.current?.value || context?.user.phone || ''
            },{
                headers: {
                    "user-id" : context?.user.id
                }
            })

            console.log(res)
            console.log('Response from API:', res.data);

            if(context?.user){
                setClicked(false)
                context.userDispatch({type : 'UPDATE', data : res.data})
                console.log(context?.user)
            }
         } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 401)
                alert('נתונים לא תקינים!');
              console.log(e);;
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
                    <TextField fullWidth label="First Name" variant="outlined" inputRef={firstNameRef} />
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