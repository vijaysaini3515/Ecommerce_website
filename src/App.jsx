import React from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import {useRoutes} from 'react-router-dom'
import routes from './Routes';
import '@brainhubeu/react-carousel/lib/style.css';
import Category from './Components/Category';


const App = () => {
  const element = useRoutes(routes)
  return (
    <div>
      <Navbar />
      {element}
      <Category />
    </div>
  )
}

export default App
