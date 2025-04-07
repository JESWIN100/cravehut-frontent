import React from 'react'
import AdminHeader from '../components/admin/Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
    <div>
    <AdminHeader/>
    <div className='min-h-96'>
    <Outlet/>
    </div>
    {/* <Footer/> */}
</div>
</div>
  )
}
