"use client";

import { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('./api/Forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Form data saved successfully');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.log(response);
        console.error('Failed to save form data');
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };
  
  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 4xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
    <div className="flex flex-row gap-3 pb-4">
         <h1 className="text-3xl font-bold text-[#4B5563] text-[#4B5563] my-auto">Feedback</h1>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="pb-5">
            <div className="relative text-gray-400">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"></input>
              </div>
        </div>
        <div className="pb-5">
            {/* <label for="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label> */}
            <div className="relative text-gray-400"> 
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"></input>
            </div>
        </div>
        <div className="pb-5">
            {/* <label for="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label> */}
            <div className="relative text-gray-400"> 
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              // typeof='text'
              id="message"
              name="message"
              value={formData.message}
              onChange={handleTextChange}
              rows={5}
              placeholder="Message"
              className="pl-5 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"></textarea>
            </div>
        </div>
        <button type="submit" className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">Submit</button>
    </form>
</div>
  );
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-15 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <Contact/>
        </div>
    </main>
  );
}
