import React from 'react'
import { Outlet } from 'react-router-dom'

import ResturentHeader from '../components/resturant/ResturentHeader'

export default function RestutrantLayout() {
  return (
    <div>
    <div>
    <ResturentHeader/>
    <div className='min-h-96'>
    <Outlet/>
    </div>
    {/* <Footer/> */}
</div>
</div>
  )
}
