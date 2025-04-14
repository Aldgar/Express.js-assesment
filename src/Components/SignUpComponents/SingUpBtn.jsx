// src/components/SignUp.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the validation schema using zod
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password is required'),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Proceed with sign-up logic (e.g., API call)
  };

  return (
<>

    <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Username' className='bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white' type="text" {...register('username')} />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        <input placeholder='Email' className='bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white' type="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        <input placeholder='Password' className='bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white' type="password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        <input placeholder='Confirm Password' className='bg-[#23155B] w-96 mb-5 h-16 p-4 rounded-lg text-white' type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
    
      <button className='w-96 mb-5 h-12 bg-blue-600 text-white rounded-lg' type="submit">Sign Up</button>
    </form>
    </>
  );
};

export default SignUp;