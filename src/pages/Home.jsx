import React, { useState } from 'react'; // Asegúrate de importar useState desde 'react'
import { Sidebar } from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';


function Home() {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    return (
        <>
            <div className='flex'>
                <Sidebar sidebarToggle={sidebarToggle}></Sidebar>
                <DashboardNavbar
                    sidebarToggle={sidebarToggle}
                    setSidebarToggle={setSidebarToggle}></DashboardNavbar>
            </div>
        </>
    );
}

export default Home;
