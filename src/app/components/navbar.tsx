"use client";

import { SearchFilter } from "./search-filter";
import { useState } from "react";
import { NavbarMobile } from "./navbar-mobile";

interface NavbarProps {
  onAddUser: () => void;
  onSearch: (searchTerm: string, filterType: string) => void;
}

export const Navbar = ({ onAddUser, onSearch }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-slate-900/50 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 items-center p-4">
          <div className="flex justify-start">
            <img 
              src="appsforceio_logo.jpeg" 
              alt="AppsForceLogo" 
              className="h-20 w-20 border border-slate-700 rounded-full"
            />
          </div>

          <div className="col-span-1">
            <SearchFilter onSearch={onSearch} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onAddUser}
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add User
            </button>
          </div>
        </div>

        <NavbarMobile 
          onAddUser={onAddUser}
          onSearch={onSearch}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </nav>
  );
};