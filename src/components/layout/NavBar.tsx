import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const NavBar = () => {
    const navItemStyle = {
        color: '#6F4E37', 
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#8B4513'
        }
    }

    return (
        <Box sx={{ 
            position: 'fixed', 
            top: 10, 
            right: 10, 
            display: 'flex', 
            gap: 2,
            zIndex: 1000 
        }}>
            <Button 
                component={Link} 
                to='/' 
                sx={{
                    ...navItemStyle,
                    minWidth: 'auto',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}
            >
                <HomeIcon fontSize="small" />
                Home
            </Button>
            <Button 
                component={Link} 
                to='/about' 
                sx={{
                    ...navItemStyle,
                    minWidth: 'auto',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}
            >
                <InfoIcon fontSize="small" />
                About
            </Button>
            <Button 
                component={Link} 
                to='/recipe-details' 
                sx={{
                    ...navItemStyle,
                    minWidth: 'auto',
                    padding: '4px 8px',
                    backgroundColor: 'transparent',
                    '&:active': {
                        transform: 'scale(0.98)'
                    }
                }}
            >
                <RestaurantIcon fontSize="small" />
                Recipes
            </Button>
        </Box>
    )
}
export default NavBar