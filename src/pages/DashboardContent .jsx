// DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar } from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';

const DashboardContent = () => {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [cardsData, setCardsData] = useState([]);
    const [cpuData, setCpuData] = useState({});
    const [commitsData, setCommitsData] = useState({});
    const [releaseData, setReleaseData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cardsResponse = await axios.get('http://localhost:4000/dashboard_cards');
                setCardsData(cardsResponse.data);
                console.log(cardsResponse.data);

                const cpuResponse = await axios.get('http://localhost:4000/cpu_report');
                setCpuData(cpuResponse.data);

                const commitsResponse = await axios.get('http://localhost:4000/report_commits');
                setCommitsData(commitsResponse.data);

                const releaseResponse = await axios.get('http://localhost:4000/release_resume');
                setReleaseData(releaseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='flex'>
            <Sidebar sidebarToggle={sidebarToggle}></Sidebar>
            <DashboardNavbar
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
                cardsData={cardsData}
                cpuData={cpuData}
                commitsData={commitsData}
                releaseData={releaseData}
            ></DashboardNavbar>
        </div>
    );
};

export default DashboardContent;
