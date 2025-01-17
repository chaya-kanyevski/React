import { Grid2 as Grid } from "@mui/material";
import { Link } from "react-router"
const NavBar = () => {

    return (<>
        <Grid container>
            <Grid sx={{
                position: "fixed",
                top: 5,
                right: 5
            }}>
            <nav>
                <Link to='/' style={{ color: '#01b7c1aa', fontSize: '18px' }}>Home</Link> |
                <Link to={`/about`} style={{ color: '#01b7c1aa', fontSize: '18px' }}>About</Link> 
            </nav>
            </Grid>
        </Grid>
    </>)
}
export default NavBar