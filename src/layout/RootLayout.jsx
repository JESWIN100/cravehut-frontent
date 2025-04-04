import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'

export default function RootLayout() {
  return (
    <div>
        <div>
        <Header/>
        <div className='min-h-96'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
    </div>
  )
}
