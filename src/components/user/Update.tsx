import { FormEvent, use, useRef, useState } from "react";
import { UserContext } from "../../App";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'linear-gradient(50deg, #F5E6D3 50%, #FAF0E6 80%)',
    border: '3px solid #F5E6D3',
    boxShadow: 24,
    borderRadius: '16px',
    p: 4,
    color: '#6F4E37'
};

export const Update = () =>{
    const [clicked, setClicked] = useState(false)
    const firstNameRef = useRef<HTMLInputElement>(null)    
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const context = use(UserContext);
    const handleSubmit = async(e : FormEvent) => {
        e.preventDefault()
        setClicked(false);
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
            if(context?.user){
                setClicked(false)
                context.userDispatch({type : 'UPDATE', data : res.data})
            }
         } catch (error: any) {
            const status = error.response?.status;
            switch(status) {
                case 400:alert('Invalid data. Please check the details you entered.');break;
                case 401:alert('Unauthorized. Please log in again.');break;
                case 403:alert('Forbidden. You do not have permission to perform this action.');break;
                case 404:alert('User not found. Please try again.');break;
                default: alert('An error occurred. Please try again.')

            console.error('Error updating user:', error);
        }}}
    return(
    <>
    <Button variant="contained" onClick={() => setClicked(true)}
        sx={{ backgroundColor: '#F5E6D3', color: '#8B4513','&:hover': {backgroundColor: '#FAF0E6'}}}>Update Profile</Button>
    <Modal open={clicked}onClose={() => setClicked(false)}>        
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color: '#6F4E37'}}>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="First Name" variant="outlined" inputRef={firstNameRef} 
                        sx={{'& .MuiInputLabel-root': { color: '#6F4E37' },'& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#6F4E37' },'&:hover fieldset': { borderColor: '#8B4513' },
                                '&.Mui-focused fieldset': { borderColor: '#8B4513' },},}}/>
                    <TextField fullWidth label="Last Name" variant="outlined" inputRef={lastNameRef} 
                        sx={{'& .MuiInputLabel-root': { color: '#6F4E37' },'& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#6F4E37' },'&:hover fieldset': { borderColor: '#8B4513' },
                                '&.Mui-focused fieldset': { borderColor: '#8B4513' },},}}/>
                    <TextField fullWidth label="Email" variant="outlined" inputRef={emailRef} 
                        sx={{
                            '& .MuiInputLabel-root': { color: '#6F4E37' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#6F4E37' },
                                '&:hover fieldset': { borderColor: '#8B4513' },
                                '&.Mui-focused fieldset': { borderColor: '#8B4513' },},}}/>
                    <TextField fullWidth label="Address" variant="outlined" inputRef={addressRef} 
                        sx={{'& .MuiInputLabel-root': { color: '#6F4E37' },'& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#6F4E37' },'&:hover fieldset': { borderColor: '#8B4513' },
                                '&.Mui-focused fieldset': { borderColor: '#8B4513' },},}}/>
                    <TextField fullWidth label="Phone" variant="outlined" inputRef={phoneRef} 
                        sx={{'& .MuiInputLabel-root': { color: '#6F4E37' },'& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#6F4E37' },'&:hover fieldset': { borderColor: '#8B4513' },
                                '&.Mui-focused fieldset': { borderColor: '#8B4513' },},}}/>
                    <Button type='submit' variant="contained" 
                        sx={{backgroundColor: '#8B4513', color: '#F5E6D3',
                            marginTop: '15px','&:hover': {backgroundColor: '#6F4E37'}}}>
                        Send</Button>
                </form>
            </Typography>
        </Box>
    </Modal>
    </>
)}
export default Update