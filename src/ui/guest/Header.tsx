import React, { useState } from 'react';
import PrimaryButton from '../shared/PrimaryButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-6 md:px-10  shadow-md fixed top-0 left-0 bg-white z-50">
      <div className="max-w-[1300px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-28 sm:w-32">
          <img
            src="./images/logo.png"
            alt="brand logo"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-base lg:text-xl text-gray-700">
          <ul className="flex gap-6 items-center">
            <li>
              <a href="/" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-primary">
                How it Works?
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#contact-us" className="hover:text-primary">
                Contact Us
              </a>
            </li>
          </ul>
          <PrimaryButton
            text="SIGNUP/SIGNIN"
            onClick={() => navigate('/login')}
          />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-4 mt-4 text-lg text-gray-700 bg-white shadow-lg rounded-lg py-6">
          <a href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
            How it Works?
          </a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>
            Services
          </a>
          <a href="#contact-us" onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </a>
          <PrimaryButton
            text="SIGNUP/SIGNIN"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/login');
            }}
          />
        </div>
      )}
    </header>
  );
}
