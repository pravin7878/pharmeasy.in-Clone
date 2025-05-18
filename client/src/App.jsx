import './App.css'
import '@fontsource/roboto/400.css';
import { RouterProvider } from 'react-router-dom'
import Allroutes from './routes/Allroutes.jsx'


function App() {
  return (
    <RouterProvider router={Allroutes}/>
  )
}

export default App
