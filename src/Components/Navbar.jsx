// eslint-disable-next-line no-unused-vars
import React from 'react'
import logoImage from '../assets/logo2.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import CategoriesList from './CategoriesList';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const handleToggleTheme = () => {
      setDarkMode(!darkMode);
      document.body.classList.toggle('dark-mode', !darkMode);
    }
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      }

  return (
    <>
    <div className='bg-[#E5E7EB] '>
        
    <img className='ml-7' src={logoImage} alt="logo" />
    <div className='flex'>
    <h1 className='ml-24 text-xl'>CodeCla</h1>
    <NavLink className='ml-10 text-xl'>Challanges</NavLink>
    <NavLink className='ml-10 text-xl'>Leaderboard</NavLink>
    </div>
    <div className='flex justify-end '>
    <img src="" alt="" />


    <div className="">
        <div className="" onClick={toggleDropdown}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-ful"
          />
          <span className="">Moe</span>
          {dropdownOpen && (
            <div className="">
              <NavLink to="/profile" className="">Profile</NavLink>
              <NavLink to="/settings" className="">Logout</NavLink>
            </div>
          )}
        </div>
        </div>

    <button onClick={handleToggleTheme} className="">
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
        </div>

        <div>
            <CategoriesList/>
        </div>
    </div>

    </>
  )
}

export default Navbar