import React, { useEffect, useState } from 'react';
import PrimaryButton from '../shared/PrimaryButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 108);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-[108px] z-50 flex items-center text-neutrals-900 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'fixed top-0 left-0 bg-white shadow-md px-20 guest-bg-gradient '
          : 'relative'
      } `}
    >
      <div className="mx-auto flex justify-between items-center h-full w-full">
        {/* Logo */}
        <div className="">
          <img
            src="./images/logo.png"
            alt="brand logo"
            className="w-full h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden items-center lg:flex gap-[42px] text-neutral-900 font-semibold text-[16px] leading-[25px]">
          <li>
            <a href="/" className="hover:text-primary-teal">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-primary-teal">
              About Us
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="hover:text-primary-teal">
              How it Works?
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-primary-teal">
              Services
            </a>
          </li>
          <li>
            <a href="#contact-us" className="hover:text-primary-teal">
              Contact Us
            </a>
          </li>
        </ul>
        <PrimaryButton
          text="SIGNUP / SIGNIN"
          onClick={() => navigate('/choose-accounttype')}
        />

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
        <div className="lg:hidden flex flex-col gap-4 px-4 mt-4 text-lg text-neutral-900 bg-white shadow-lg rounded-lg py-6">
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
            text="SIGNUP / SIGNIN"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/choose-accounttype');
            }}
          />
        </div>
      )}
    </header>
  );
}
