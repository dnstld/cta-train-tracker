import React from 'react';

const Layout: React.FC = ({ children }) => (
  <div className="w-screen min-h-screen flex flex-col items-center bg-gray-100 pt-20">
    <nav className="fixed top-0 left-0 z-10 w-full flex bg-gray-700 text-gray-50 p-4">
      <header className="">
        <h1 className="flex items-center antialiased tracking-wide font-bold">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded text-gray-800 mr-2">
            CTA
          </span>
          <div>
            Train Tracker
            <span className="block font-normal text-xs italic">
              Get estimated arrival times
            </span>
          </div>
        </h1>
      </header>
    </nav>

    <main className="flex-1 w-full max-w-screen-2xl p-4">{children}</main>

    <footer className="w-screen bg-gray-700 text-gray-50 p-2 text-center">
      <small>©2020 Chicago Transit Authority</small>
    </footer>
  </div>
);

export default Layout;
