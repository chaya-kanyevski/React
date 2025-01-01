import { useContext } from "react"
import { UserContext } from "./Home"
import { Avatar, Box, Typography } from "@mui/material";


const UserName = () =>{
    const context = useContext(UserContext)

    let name : string = ''

    if (context) {
        name = context.user?.firstName
    }


    return(
        <>
        
        <Box sx={{display: "flex", alignItems: "center", marginBottom:"20px"}}>

            <Avatar sx={{bgcolor:"#40E0D0", marginRight: "15px"}}>{name[0]}</Avatar>

            <Typography variant="h6">hello {name}!</Typography>

        </Box>

        </>
    )
}
export default UserName