import React, { ReactElement } from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme, SvgIconProps } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import GroupIcon from '@mui/icons-material/Group';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface AboutSectionProps { icon: ReactElement<SvgIconProps>; title: string; description: string; }

const About = () => {
  const theme = useTheme();
  const AboutSection: React.FC<AboutSectionProps> = ({ icon, title, description }) => (
    <Paper elevation={0} sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex',
     flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      {React.cloneElement(icon, { sx: { fontSize: 60, color: theme.palette.primary.main, mb: 2 } })}
      <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: 600 }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}>{description}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ position: 'relative', width: '100%', minHeight: '100%', display: 'flex',
     flexDirection: 'column', justifyContent: 'center', alignItems: 'center', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ color: theme.palette.text.primary, fontWeight: 600, 
            mb: 2, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-8px',
             left: '50%', transform: 'translateX(-50%)', width: '80px', height: '3px',
              backgroundColor: theme.palette.primary.main } }}>
            About Flavor Journey
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}>
            Flavor Journey is more than just a recipe website. We're a passionate community of food lovers, 
            home cooks, and culinary explorers dedicated to sharing the joy of cooking and bringing people 
            together through delicious experiences.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}><AboutSection icon={<RestaurantIcon />} title="Our Mission" description="To inspire creativity in the kitchen, preserve culinary traditions, and create a global platform where food lovers can connect, learn, and share their gastronomic adventures." /></Grid>
          <Grid item xs={12} md={3}><AboutSection icon={<GroupIcon />} title="Community" description="We believe in the power of community. Our platform brings together home cooks, professional chefs, and food enthusiasts from around the world, creating a vibrant and supportive culinary network." /></Grid>
          <Grid item xs={12} md={3}><AboutSection icon={<EmojiObjectsIcon />} title="Innovation" description="We constantly strive to innovate, making recipe sharing easier, more interactive, and more enjoyable. Our platform is designed to adapt to the evolving needs of modern food lovers." /></Grid>
          <Grid item xs={12} md={3}><AboutSection icon={<FavoriteIcon />} title="Passion" description="At the heart of Flavor Journey is a deep love for food. We celebrate diversity, creativity, and the universal language of delicious, home-cooked meals." /></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;