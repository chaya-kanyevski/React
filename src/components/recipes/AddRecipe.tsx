import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import RecipeStore, { Recipe } from "../../store/RecipeStore";
import { recipeSchema } from "./RecipeValidation";
import { Button, Dialog, DialogContent } from "@mui/material";
import RecipeFormFields from "./RecipeFormFields";
import { UserContext } from "../../App";

const AddRecipe = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const context = useContext(UserContext);

    useEffect(() => {
      if(context?.user && context.user.id !== null)
          setIsUserLoggedIn(true);
  }, [context]);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<Partial<Recipe>>({
      resolver: yupResolver(recipeSchema),
      context: { isSubmitted: true, user: context?.user }
    });
  
    const onSubmit = async (data: Partial<Recipe>) => {
      try {
        await RecipeStore.addRecipe(data as Recipe, context?.user.id || null);
        reset();
        setIsDialogOpen(false);

      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    }
    
    return(
    <>
        {isUserLoggedIn &&
        <Button 
        variant="contained" 
        onClick={() => {
            setIsDialogOpen(true);
        }}>add recipe</Button>
        }
        <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        >
            <DialogContent>
                <RecipeFormFields 
                    control={control}
                    errors={errors}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </DialogContent>
        </Dialog>
    </>
    )
}
export default AddRecipe