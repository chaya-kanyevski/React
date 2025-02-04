import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios";

export type Recipe = {
    id?: number,
    title: string,
    description: string,
    authorId?: number,
    ingredients?:string[],
    instructions: string
}

export class RecipeStore {
    recipes: Recipe[] = []
    selectedRecipe: Recipe | null = null

    constructor() {
        makeAutoObservable(this);
        this.getRecipes();
    }

    async getRecipes() {
        try {
            const res = await axios.get('http://localhost:3000/api/recipes')
            runInAction(() => {
                this.recipes = res.data.map((recipe: Recipe) => ({
                    ...recipe,
                    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : []
                }))
            });
        } catch (e: any) {
            runInAction(() => {
                this.recipes = [];
            });           
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    alert(`Server Error: ${e.response.status} - ${e.response.data.message || 'Unknown error'}`);
                } else if (e.request) {
                    alert('No response received from server. Please check your network connection.');
                } else {
                    alert('Error setting up the request. Please try again.');
                }
            } else {
                alert('An unexpected error occurred');
            }
            console.error('Recipes fetch error:', e);
        }
    }
   
    setSelectedRecipe(id: number | null) : Recipe | null{
        return this.selectedRecipe = this.recipes.find(t => t.id === id) || null;
    }

    async addRecipe(recipe: Recipe, id: number | null) {
        try {
            const res = await axios.post('http://localhost:3000/api/recipes', {
                title: recipe.title,
                description: recipe.description,
                ingredients: recipe.ingredients || [],
                instructions: recipe.instructions
            },
                {
                    headers: {
                        'user-id': id
                    },
                }
            )
            runInAction(() => {
                this.recipes.push({
                    ...res.data.recipe,
                    ingredients: res.data.recipe.ingredients || []
                })
            });
            alert('Recipe added successfully!');
        } catch (e: any) {
            alert('An error occurred while adding the recipe');
            console.log(e);
        }
    }
}

export default new RecipeStore();