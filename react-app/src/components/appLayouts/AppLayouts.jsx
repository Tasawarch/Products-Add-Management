import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../../layouts/header/header';

function AppLayouts() {
  return (
    <>
      <Header/>
      <Outlet/>
      
    </>
  )
}

export default AppLayouts;
