import { useState } from 'react'
import './App.css'
import { Hero } from './Components/Hero'
import { Footer } from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import {Home, CartPage, AuthPage, ProductPage, ChannelsPage, ChatPage, _404Page, ProfilePage, SettingsPage, DashBoardPage, MarketPlace, AboutProduct, Notifications, SentAToken} from "./Pages/index"
import Contact from './Pages/Contact'
import About from './Pages/About'
import VerifyUser from './Pages/VerifyUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart/:id' element={<CartPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/dashBoard/:id' element={<DashBoardPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/channels' element={<ChannelsPage />} />
          <Route path='/chat/:id' element={<ChatPage />} />
          <Route path='/marketplace' element={<MarketPlace />} />
          <Route path='/aboutproduct/:id' element={<AboutProduct />} />
          <Route path='/notifications' element={<Notifications />} />

      </Route>

      <Route path='/auth' element={<AuthPage />} />
      <Route path='/*' element={<_404Page />} />
      <Route path='/verifytoken' element={<VerifyUser />} />
      <Route path='/sentatoken' element={<SentAToken />} />

    </Routes>
    
    </BrowserRouter>
    
      
    </>
  )
}

export default App
