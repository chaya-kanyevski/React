import React, { useState } from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { TextField, Box, DialogActions, Button, Grid, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Recipe } from '../../store/RecipeStore';

interface RecipeFormFieldsProps {
  control: Control<Partial<Recipe>>;
  errors: FieldErrors<Partial<Recipe>>;
  onSubmit: () => void;
  onCancel: () => void;
}

const RecipeFormFields: React.FC<RecipeFormFieldsProps> = ({ control, errors, onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrEditIngredient = (currentIngredients: string[]) => {
    if (inputValue.trim() === '') return currentIngredients;
    if (editingIndex !== null) {
      const updatedIngredients = [...currentIngredients];
      updatedIngredients[editingIndex] = inputValue.trim();
      setEditingIndex(null);
      return updatedIngredients;
    }
    return [...currentIngredients, inputValue.trim()];
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller name="title" control={control} defaultValue="" render={({ field }) => (
            <TextField id="outlined-basic-title" {...field} margin="normal" fullWidth label="Title"
             variant="outlined" error={!!errors.title} helperText={errors.title?.message}/>
          )}/>
          <Controller name="description" control={control} defaultValue="" render={({ field }) => (
            <TextField id="outlined-basic-description" {...field} margin="normal" fullWidth label="Description"
             variant="outlined" multiline rows={3} error={!!errors.description} helperText={errors.description?.message}/>
          )}/>
          <Controller name="ingredients" control={control} defaultValue={[]} render={({ field: { onChange, value } }) => (
            <>
              <TextField id="outlined-basic-ingredients" fullWidth label="Ingredients" variant="outlined" multiline rows={3}
               value={inputValue} onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                if (newValue.includes('\n')) {
                  const updatedIngredients = handleAddOrEditIngredient(value || []);
                  onChange(updatedIngredients);
                  setInputValue('');
                }
              }} onBlur={() => {
                if (inputValue.trim() !== '') {
                  const updatedIngredients = handleAddOrEditIngredient(value || []);
                  onChange(updatedIngredients);
                  setInputValue('');
                }
              }} error={!!errors.ingredients} helperText={errors.ingredients?.message || 
              'Enter ingredients, one per line'} placeholder="Enter ingredients, one per line"/>
              {value && value.length > 0 && (
                <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: 1, p: 1, mt: 1, 
                display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {value.map((ingredient, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    backgroundColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 1, px: 1, py: 0.5 }}>
                      {ingredient}
                      <Box>
                        <Tooltip title="Edit"><IconButton size="small" onClick={() => { setInputValue(ingredient); setEditingIndex(index); }}>
                          <EditIcon fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" onClick={() => onChange(value.filter((_, i) => i !== index))}>
                          <DeleteIcon fontSize="small" /></IconButton></Tooltip>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}/>
          <Controller name="instructions" control={control} defaultValue="" render={({ field }) => (
            <TextField id="outlined-basic-instructions" {...field} margin="normal" fullWidth label="Instructions"
             variant="outlined" multiline rows={3} error={!!errors.instructions} helperText={errors.instructions?.message}/>
          )}/>
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={onCancel} sx={{ color: '#8B4513' }}>Cancel</Button>
        <Button type="submit" color="primary" variant="contained">Save Recipe</Button>
      </DialogActions>
    </Box>
  );
};

export default RecipeFormFields;