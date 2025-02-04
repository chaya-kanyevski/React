import { RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './Router'
import { useReducer } from 'react'
import { initialUser, UserContextType, userReducer } from './components/user/User'
import { createContext } from 'react'

export const UserContext = createContext<UserContextType | null>(null);

function App() {

  const [user, userDispatch] = useReducer(userReducer, initialUser)
  return (
        <>
        <UserContext value={{ user, userDispatch }}>
            <RouterProvider router={myRouter} />
        </UserContext>
       </>
  )
}

export default App
