import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#F5E6D3',     
      light: '#FAF0E6',    
      dark: '#E6D5C1',     
    },
    secondary: {
      main: '#FFD5AD',     
      light: '#FFE4CA',    
      dark: '#FFC69B',     
    },
    background: {
      default: '#FFFFFF',  
      paper: '#FFFFFF',    
    },
    text: {
      primary: '#6F4E37',  
      secondary: '#8B4513'
    },
    error: {
      main: '#8B0000'      
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { color: '#6F4E37' },
    h2: { color: '#6F4E37' },
    h3: { color: '#8B4513' },
    body1: { color: '#6F4E37' },
    body2: { color: '#8B4513' }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(50deg, #F5E6D3 50%, #FFD5AD 80%)',
          borderRadius: 16,
          border: '3px solid #F5E6D3',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          transition: 'background-color 0.3s ease, color 0.3s ease', 
          '&:hover': {
            transition: 'background-color 0.3s ease, color 0.3s ease' 
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, color 0.3s ease', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            transition: 'background-color 0.3s ease, color 0.3s ease' 
          }
        }
      }
    }
  }
});