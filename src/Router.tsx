import Layout from "./components/layout/Layout";
import About from "./components/About";
import Home from "./components/Home";
import RecipeDetails from "./components/recipes/RecipeDetails";
import { createBrowserRouter } from "react-router-dom";
import AddRecipe from "./components/recipes/AddRecipe";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/recipe-details',
                element: <RecipeDetails />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/add-recipe',
                element: <AddRecipe />
            }
        ]
    }
]);
