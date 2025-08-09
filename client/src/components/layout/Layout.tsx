import React from 'react';
import Header from '../header/Header';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <div className="flex flex-1 min-h-0">
      <div className="w-1/4 max-w-xs bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </div>
      <main className="w-3/4 flex-1 p-8 overflow-auto">{children}</main>
    </div>
  </div>
);

export default Layout