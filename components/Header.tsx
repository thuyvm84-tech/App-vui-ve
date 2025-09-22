import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg text-center py-6">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Vu Minh Thuy
        </span>
      </h1>
      <p className="text-gray-300 mt-2 text-lg">Du lịch thế giới chỉ với một cú nhấp chuột.</p>
    </header>
  );
};
