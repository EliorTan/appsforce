"use client";

import { SearchFilter } from "./search-filter";

interface NavbarMobileProps {
  onAddUser: () => void;
  onSearch: (searchTerm: string, filterType: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ 
  onAddUser, 
  onSearch, 
  isMenuOpen, 
  setIsMenuOpen 
}: NavbarMobileProps) => {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4">
        <img 
          src="appsforceio_logo.jpeg" 
          alt="AppsForceLogo" 
          className="h-12 w-12 border border-slate-700 rounded-full"
        />
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} px-4 pb-4 space-y-4`}>
        <div className="mb-4">
          <SearchFilter onSearch={onSearch} />
        </div>
        
        <button
          onClick={onAddUser}
          className="w-full px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
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
  );
};
