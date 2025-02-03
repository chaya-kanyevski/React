import { observer } from 'mobx-react-lite';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box} from '@mui/material';
import RecipeStore from '../../store/RecipeStore';

const RecipeDetails = observer(() => {
  const { selectedRecipe } = RecipeStore;

  if (!selectedRecipe) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '200px',
        color: 'text.secondary'
      }}>
        Please choose a recipe from the list
      </Box>
    );
  }

  return (
    <Card sx={{ 
      width: 600,  
      height: 'auto',  
      overflowY: 'auto',  
      boxShadow: 'none',   
    }}>
      <CardContent>
        <Typography variant="h4">{selectedRecipe.title}</Typography>
        <Typography variant="body1">{selectedRecipe.description}</Typography>
        
        <Typography variant="h6">Ingredients:</Typography>
        <List dense>  
          {(selectedRecipe.ingredients || []).map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
  
        <Typography variant="h6">Preparation instructions:</Typography>
        <Typography variant="body1">{selectedRecipe.instructions}</Typography>
      </CardContent>
    </Card>
  );
})

export default RecipeDetails;