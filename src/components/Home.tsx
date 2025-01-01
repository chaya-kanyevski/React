import { createContext, useReducer, useState } from "react";
import { User, userReducer } from "./User";
import Login from "./Login";
import { Grid2 as Grid } from "@mui/material"
import UserName from "./UserName+Avatar";
import { Update } from "./Update";


export type UserContextType = {
  user : User,
  userDispatch : React.Dispatch<any>
}

export const UserContext = createContext<UserContextType | null>(null)

const Home = () =>{
  const initialUser: User = {
    firstName: 'chaya',
    lastName: '',
    email: '',
    password: '1234',
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

      {loginSuccess === false && <Login onLoginSuccess={handleLoginSuccess}></Login>}

      {loginSuccess && <UserName></UserName>}

      {loginSuccess && <Update></Update>}

      </UserContext.Provider>

      {/* <br />
      {user.firstName}
      <br />
      {user.lastName}
      <br />
      {user.email}
      <br />
      {user.password}
      <br />
      {user.address}
      <br />
      {user.phone} */}
             </Grid>

        </Grid> 
      </>
    )
}

export default Home