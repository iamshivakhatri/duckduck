import React from 'react'
import LandingPageNavbar from './components/navbar';


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col py-10 px-10 xl:px-0 container'>
      <LandingPageNavbar />
      {children}
    </div>

   
  );
}
