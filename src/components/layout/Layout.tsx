import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import RecipesList from "../recipes/RecipesList";
import { User, userReducer } from '../user/User';
import { createContext, useReducer, useState } from 'react';
import Login from '../user/Login';
import Sign from '../user/Sign';
import UserName from '../user/UserName+Avatar';
import Update from '../user/Update';

const drawerWidth = 340;

export type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<any>;
};

export const UserContext = createContext<UserContextType | null>(null);

const Layout = () => {

    const initialUser: User = {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    };

    const [user, userDispatch] = useReducer(userReducer, initialUser)

    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const handleLoginSuccess = () => {
        setLoginSuccess(true)
      }


    return (
        <UserContext value={{ user, userDispatch }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar />    
                <Box 
                    component="main" 
                    sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)`,marginTop: '64px' }}>
                    <Outlet />
                </Box>
                <Drawer
                    variant="permanent"
                    anchor="right"
                    sx={{width: drawerWidth, flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { 
                            width: drawerWidth, boxSizing: 'border-box', top: 64, 
                            height: 'calc(100% - 64px)',borderRadius: 0, border: 'none' },}}>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}><RecipesList /></Box>
                </Drawer>
            </Box>
            {!loginSuccess ? ( 
          <Box 
            sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1000, display: 'flex', gap: 2}}
            role="region" aria-label="Login and Sign Up">
            <Login onLoginSuccess={handleLoginSuccess} />
            <Sign onSignSuccess={handleLoginSuccess}/>
          </Box>
        ) : ( 
          <Box 
            sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1000, display: 'flex',flexDirection: 'column',  gap: 2}}
            role="region" 
            aria-label="User Profile">
            <UserName />
            <Update/>
          </Box>
        )}
        </UserContext>
    )
}
export default Layout;