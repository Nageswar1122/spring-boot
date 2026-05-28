import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/user/components/Navbar';
import Footer from '@/user/components/Footer';

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
