import { useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    about: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('about', formData.about);
    if (formData.avatar) {
      data.append('avatar', formData.avatar);
    }

    try {
      const response = await axios.put('http://localhost:4000/api/profile/1', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
      <textarea name="about" placeholder="About" onChange={handleChange}></textarea>
      <input type="file" name="avatar" onChange={handleFileChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileUpdate;