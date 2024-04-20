import React, { useState } from 'react'; // Asegúrate de importar useState desde 'react'
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { Navbar } from '../components/Navbar';

function Home() {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return (
        <>
            <div className='flex'>
                <Sidebar sidebarToggle={sidebarToggle}></Sidebar>
                <Dashboard
                    sidebarToggle={sidebarToggle}
                    setSidebarToggle={setSidebarToggle}></Dashboard>
            </div>
        </>
    );
}

export default Home;
