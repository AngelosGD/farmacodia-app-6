import React from 'react'
import {HomeFarmacodia, NotFound,AboutPage, BlogPage, LoginPage, SignupPage, DirectorioPage, Subscribirse, UserProfilePage, Contacto} from './pages/index.js'
import {Routes, Route} from 'react-router-dom'
//Codigo que manda llamar todas las rutas a la pagina
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeFarmacodia/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/About' element={<AboutPage/>} />
        <Route path='/Blog' element={<BlogPage/>} />
        <Route path='/Login' element={<LoginPage/>} />
        <Route path='/Signup' element={<SignupPage/>} />
        <Route path='/Directorio' element={<DirectorioPage/>}></Route>
        <Route path='/Subscribirse' element={<Subscribirse/>} />
        <Route path='/UserProfile' element={<UserProfilePage/>}></Route>
        <Route path='/Contacto' element={<Contacto/>} />
      </Routes>
    </div>
  )
}

export default App


