import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GoProjectSymlink } from 'react-icons/go';
import { GrProjects } from 'react-icons/gr';
import { PiUsersFour } from 'react-icons/pi';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

export const Sidebar = ({ sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? " hidden " : " block "} w-64 bg-slate-100 fixed h-full px-4 py-2`}>
      <div className='my-2 mb-4'>
                        <img src={logo} className="h-8 mr-2" />
      </div>
      <hr />
      <ul className='mt-3 text-gray-500 font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-indigo-700  hover:text-white py-2'>
        <Link to="/dashboard" className='px-3 flex items-center'>
            <GrProjects className='w-6 h-6 mr-2 -mt-1' />
            Dashboard
          </Link>
        </li>
      </ul>

      <ul className='mt-3 text-gray-500 font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-indigo-700  hover:text-white py-2'>
        <Link to="/projects" className='px-3 flex items-center'>
            <GoProjectSymlink className='w-6 h-6 mr-2 -mt-1' />
            Proyectos
          </Link>
        </li>
      </ul>

      <ul className='mt-3 text-gray-500 font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-indigo-700  hover:text-white py-2'>
          <a href="#" className='px-3 flex items-center'>
            <FaRegUser className='w-6 h-6 mr-2 -mt-1' />
            Usuarios
          </a>
        </li>
      </ul>

      <ul className='mt-3 text-gray-500 font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-indigo-700  hover:text-white py-2'>
          <a href="#" className='px-3 flex items-center'>
            <PiUsersFour className='w-6 h-6 mr-2 -mt-1' />
            Roles
          </a>
        </li>
      </ul>
    </div>
  );
};
