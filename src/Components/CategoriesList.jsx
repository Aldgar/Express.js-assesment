// eslint-disable-next-line no-unused-vars
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function CategoriesList() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      }
  return (
    <div>
        <NavLink className=""onClick={toggleDropdown}>Select Category</NavLink>
          {dropdownOpen && (
            <div className="">
              <NavLink to="/" className="">All</NavLink>
              <NavLink to="/datastructure" className="">Data Structure</NavLink>
              <NavLink to="/graphs" className="">Graphs</NavLink>
              <NavLink to="/database" className="">Databases</NavLink>
            </div>
          )}
    </div>
  )
}

export default CategoriesList