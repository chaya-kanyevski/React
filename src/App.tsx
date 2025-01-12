import { RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import { myRouter } from './Router'


function App() {


  return (
    <>
    <Home></Home>
    <RouterProvider router={myRouter} />
    </>
  )
}

export default App
