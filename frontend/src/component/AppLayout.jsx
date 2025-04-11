import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function AppLayout() {
  return (
    
    <div className="app">
      <Header/>
      <main>
      <Outlet/>
      </main>
      
      <Footer/>
      </div>
      
    
  )
}

export default AppLayout;