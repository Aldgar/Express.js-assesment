import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const SignInBtn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validate = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    // Email validation:
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required!';
      valid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation:
    if (!formData.password) {
      newErrors.password = 'Password is required!';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
<> 
<h1 className="text-[#8053FF] text-3xl text-center mb-10">Join Coders Now!</h1>

<div className="flex flex-col-1 text-center">
    <form action='#' onSubmit={handleSubmit}>
      <div>
        <input className="bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white"type="email" 
          placeholder="Email" name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className='text-red-800'>{errors.email}</p>}
      </div>

      <div>
        <input className="bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white" 
          type="password" 
          placeholder="Password" name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className='text-red-800'>{errors.password}</p>}
      </div>

      <button className="w-96 mb-5 h-12 bg-blue-600 text-white rounded-lg">Login</button>
    </form>
    </div>

    <div className="text-center text-lg">New to CodeCLA? <NavLink to="/signup">Signup</NavLink></div>
    </>
  )
};

export default SignInBtn;