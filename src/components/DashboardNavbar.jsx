import React from 'react';
import { Navbar } from './Navbar';

const DashboardNavbar = ({ sidebarToggle, setSidebarToggle }) => {
    return (
        <div className={`${sidebarToggle ? "" : "ml-64"} w-full`}>
            <Navbar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle} />
        </div>
    );
};

export default DashboardNavbar;
