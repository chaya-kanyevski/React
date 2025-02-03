import { observer } from 'mobx-react-lite';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import RecipeStore from '../../store/RecipeStore';
import { useNavigate } from 'react-router-dom';
import AddRecipe from './AddRecipe';

const RecipesList = observer(() => {
    const navigate = useNavigate();    
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        height: '100%', 
        flex: 1, 
        overflow: 'hidden' 
      }}>
        <List 
          sx={{ 
            width: '100%', 
            flex: 1, 
            overflowY: 'auto',
            mb: 1 
          }}
        >
          {RecipeStore.recipes.map(recipe => (
            <ListItem 
              key={recipe.id} 
              onClick={() => {
                RecipeStore.setSelectedRecipe(recipe.id || null);
                navigate(`/recipe-details`);
              }}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <ListItemText 
                primary={
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 'bold',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {recipe.title}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {recipe.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 1, 
          pb: 1 
        }}>
          <AddRecipe />
        </Box>
      </Box>
    )

})
export default RecipesList;