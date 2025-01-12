import { Outlet } from "react-router"
import NavBar from "./NavBar"
const Layout = () =>{
    return (
        <>
            <div style={{border: '1px solid green'}}>
                <NavBar/>
                <div></div>
                <Outlet />
                <div></div>
                _______________________________________
            </div>
                ************
    </>)
}
export default Layout