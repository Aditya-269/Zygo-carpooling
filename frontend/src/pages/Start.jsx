import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1746121608382-ebd0e43a2163?q=80&w=2569&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
      
      {/* Logo */}
      <div className="pt-8 px-6">
        <h3 className="font-['Rock_Salt'] text-2xl text-black/80">Zygo</h3>
      </div>

      {/* Bottom Content Section */}
      <main className="bg-white pt-4 pb-8 px-4">
        <h2 className="text-[30px] font-semibold">Get Started with Zygo</h2>
        <Link
          to="/login"
          className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5"
        >
          Continue
        </Link>
      </main>
    </div>
  );
};

export default Start;
