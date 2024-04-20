import React from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'

export const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <nav className='bg-slate-100 px-4 py-3 flex justify-between'>
      <div className='flex items-center text-xl'>
        <FaBars className='text-gray-700 mr-4 cursor-pointer'
          onClick={() => setSidebarToggle(!sidebarToggle)} />
        <span className='text-gray-700 font-semibold'></span>
      </div>
      <div className='flex items-center gap-x-5'>
        <div>
          <nav className='text-gray-700'><FaBell className='w-6 h-6'></FaBell></nav>
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
