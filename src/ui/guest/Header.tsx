import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFixedHeader, setShowFixedHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedHeader(window.scrollY > 108);
    };

    window.addEventListener('scroll', handleScroll);

    // Ensure correct state on first render
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    if (location.pathname !== '/') return;
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[108px] z-50 flex items-center text-neutrals-900 transition-all duration-300 ease-in-out px-6 md:px-20 ${
        showFixedHeader
          ? 'bg-white shadow-md guest-bg-gradient opacity-100'
          : 'opacity-95'
      }`}
    >
      <div className="mx-auto flex justify-between items-center h-full w-full max-w-[1440px]">
        {/* Logo */}
        <div
          className="my-10 h-full flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src="/images/logo.png" alt="brand logo" className="h-[90%]" />
        </div>

        {/* Desktop Nav */}
        {location.pathname === '/' && (
          <ul className="hidden lg:flex items-center gap-[42px] text-neutral-900 font-semibold text-[16px] leading-[25px]">
            {[
              ['#hero', 'Home'],
              ['#about', 'About Us'],
              ['#how-it-works', 'How it Works?'],
              ['#services', 'Services'],
              ['#contact-us', 'Contact Us'],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className={`hover:text-primary-teal ${
                    href == '#contact-us' ? 'hidden xl:flex' : ''
                  } `}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection(href);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="w-auto bg-transparent hover:bg-secondary-burgandy text-[15px] text-secondary-burgandy hover:text-white font-bold py-[9px] px-[27px] leading-[27px] tracking-[0.48px] rounded-[4px] transition duration-300 ease-in-out border-2 border-secondary-burgandy"
          >
            SIGN-IN
          </button>
          <button
            onClick={() => navigate('/choose-accounttype')}
            className="w-auto bg-secondary-burgandy hover:bg-transparent text-[15px] text-white hover:text-secondary-burgandy font-bold py-[5px] px-[23px] leading-[27px] tracking-[0.48px] rounded-[4px] transition duration-300 ease-in-out border-2 border-secondary-burgandy"
          >
            SIGN-UP
          </button>
        </div>

        {/* Mobile Toggle */}
        {location.pathname === '/' && (
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      {location.pathname === '/' && mobileMenuOpen && (
        <div className="lg:hidden flex flex-col px-4 text-lg text-neutral-900 bg-white shadow-lg rounded-lg py-6 absolute top-[108px] left-0 w-full z-40">
          {[
            ['#hero', 'Home'],
            ['#about', 'About Us'],
            ['#how-it-works', 'How it Works?'],
            ['#services', 'Services'],
            ['#contact-us', 'Contact Us'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="hover:text-primary-teal hover:bg-primary-teal-surface px-5 py-2 "
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection(href);
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
