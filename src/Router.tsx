import Layout from "./components/Layout";
import NavBar from "./components/NavBar";
import About from "./components/About";
import {createBrowserRouter } from "react-router";


export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement: <>main error</>,
        children: [
            {path: '/', element: <NavBar/>},
            // {path: 'chaya', element: <>my name is: chaya</>},
            {path: '/about', element: <About/>}
        ]
    }
])