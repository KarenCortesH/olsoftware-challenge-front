import React, { useState, useEffect } from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'
import axios from 'axios';

export const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notification');
        setNotification(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className='bg-slate-100 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-gray-700 mr-4 cursor-pointer'
          onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className='text-gray-700 font-semibold'></span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div>
          <nav className='text-gray-700' onClick={() => { if (notification) { /* handle notification click */ } }}>
            <FaBell className='w-6 h-6'></FaBell>
            {notification && notification.unread_count > 0 && (
              <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs'>{notification.unread_count}</span>
            )}
          </nav>
        </div>
        <div className='relative'>
          <button className='text-gray-700 group'>
            <FaUserCircle className='w-6 h-6 mt-1' />
            <div className='z-10 hidden absolutebg-white rounded-lg shadow w-32 group-focus: block top-full right-0'>
              <ul className='py-2 text-sm text-gray-700'>
                <li><a href="">Profile</a></li>
                <li><a href="">Settings</a></li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
