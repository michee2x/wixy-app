import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import {Home, CartPage, AuthPage, ProductPage, ChannelsPage, _404Page, ProfilePage, SettingsPage, DashBoardPage, MarketPlace, AboutProduct, Notifications, SentAToken, OtherChannels, YourNetworkPage, InvitationPage, ManagePage, ConnectionsPage, NewsletterPage, BookmarkPage, FollowingPage, GroupsPage, ChatPage} from "./Pages/index"
import Contact from './Pages/Contact'
import About from './Pages/About'
import VerifyUser from './Pages/VerifyUser'
import { AuthLayout } from './AuthLayout'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    
    <>
    <BrowserRouter>
    <div>
       <Toaster position='top-center'/>
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
          <Route path='/network' element={<YourNetworkPage />} />
          <Route path='/invitation' element={<InvitationPage />} />
          <Route path='/manage' element={<ManagePage />} />
          <Route path='/connections' element={<ConnectionsPage />} />
          <Route path='/newsletter' element={<NewsletterPage />} />
          <Route path='/bookmark' element={<BookmarkPage />} />
          <Route path='/following' element={<FollowingPage />} />
          <Route path='/groups' element={<GroupsPage />} />
          <Route path='/sentatoken' element={<SentAToken />} />

      </Route>

      <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<AuthPage />} />
          <Route path='/auth/verifytoken' element={<VerifyUser />} />
          <Route path='/auth/sentatoken' element={<SentAToken />} />
      </Route>

          <Route path='/*' element={<_404Page />} />

    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
