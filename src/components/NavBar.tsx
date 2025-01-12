import { Grid2 as Grid } from "@mui/material";
import { Link } from "react-router"
const NavBar = () => {
    const name = 'Chaya'
    return (<>
        <Grid container>
            <Grid sx={{
                position: "fixed",
                top: 5,
                right: 5
            }}>
            <nav>
                <Link to='/'>Home</Link> |
                <Link to={`/person/${name}`}>person</Link> 
                {/* |<Link to={`chaya`}>chaya</Link> */}
            </nav>
            </Grid>
        </Grid>
    </>)
}
export default NavBar