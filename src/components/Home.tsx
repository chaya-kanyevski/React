import { createContext, useReducer, useState } from "react";
import { User, userReducer } from "./User";
import Login from "./Login";
import { Grid2 as Grid } from "@mui/material";
import UserName from "./UserName+Avatar";
import { Update } from "./Update";
import Sign from "./Sign";


export type UserContextType = {
  user : User,
  userDispatch : React.Dispatch<any>
}

export const UserContext = createContext<UserContextType | null>(null)

const Home = () =>{
  const initialUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  }

  const [user, userDispatch] = useReducer(userReducer, initialUser)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleLoginSuccess = () => {
    setLoginSuccess(true)
  }
    return(
        <>
    <Grid container>
      <Grid xs={4} sx={{
        position: "fixed",
        top: 5,
        left: 5
      }}>

      <UserContext.Provider value={{ user, userDispatch }}>

          {!loginSuccess ? ( 
          <>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Sign onLoginSuccess={handleLoginSuccess}/>
            </>)
          : 
          ( 
            <>
              <UserName />
              <Update/>
            </>
          )}

      </UserContext.Provider>

             </Grid>

        </Grid> 
    {user.firstName}
    {user.lastName}
    {user.email}
      </>
    )
}

export default Home