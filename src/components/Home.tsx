import { Box, Typography, Grid, useTheme } from '@mui/material';

const Home = () => {
  
  const theme = useTheme();
  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Grid container>
        <Grid item xs={4} sx={{
          position: "fixed",
          top: 5,
          left: 5
        }}>
        </Grid>
      </Grid>

      <Box sx={{ 
        textAlign: 'center', 
        maxWidth: '600px', 
        padding: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 600,
            marginBottom: '16px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              backgroundColor: theme.palette.primary.main
            }
          }}
        >
          Flavor Journey
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
            marginBottom: '16px'
          }}
        >
          Embark on a culinary adventure where every recipe tells a story. 
          Discover, create, and share delicious moments that bring people together.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;