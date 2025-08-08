import React from 'react'
import Header from '../header/Header'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
)

export default Layout