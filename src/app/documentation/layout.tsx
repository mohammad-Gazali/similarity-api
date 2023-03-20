import React, { FC } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <main className='pt-20'>
        {children}
    </main>
  )
}

export default Layout