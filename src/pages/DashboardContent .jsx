// DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';
import axios from 'axios';
import Clima from './Clima';
import 'chart.js/auto';
import CpuReport from './CpuReport';
import Commits from './Commits';

const DashboardContent = () => {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const [cardsData, setCardsData] = useState([]);
    // const [cpuData, setCpuData] = useState({});
    const [commitsData, setCommitsData] = useState({});
    const [releaseData, setReleaseData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
				const token = localStorage.getItem('token'); // Obtener el token JWT almacenado en localStorage o sessionStorage
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                const cardsResponse = await axios.get('http://localhost:4000/api/dashboard_cards',{ headers });
                setCardsData(cardsResponse.data);

                const commitsResponse = await axios.get('http://localhost:4000/api/report_commits',{ headers });
                setCommitsData(commitsResponse.data);

                const releaseResponse = await axios.get('http://localhost:4000/api/release_resume',{ headers });
                setReleaseData(releaseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <Sidebar />
            {/* Contenedor principal */}
            <div className="overflow-x-auto flex-grow">
                {/* Navbar */}
                <DashboardNavbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}>
                </DashboardNavbar>
                {/* Contenido de los divs */}
                <div className="bg-white rounded-lg p-4 max-w-screen-xl  max-h-dvh mx-0 ml-auto">
                    <div className="flex m-4">
                        {/* Contenedor de los primeros dos divs */}
                        <Clima className="mt-4 p-4 w-full" />
                        <div className="flex flex-col w-1/4">
                            {/* Div 1 */}
                            <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl max-h-dvh mb-4">
                                <div className="bg-blue-400 rounded-lg p-4 text-white">
                                    <p className="text-lg font-bold mb-2">Proyectos Registrados</p>
                                    <div>
                                        <p className="mb-1 text-5xl">{cardsData.projects}</p>
                                        <p className="mb-1">Ultimo Proyecto hace 15 dias</p>
                                    </div>
                                </div>
                            </div>

                            {/* Div 2 */}
                            <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl max-h-dvh">
                                <div className="bg-indigo-700 rounded-lg p-4 text-white">
                                    <p className="text-lg font-bold mb-2">Proyectos En Desarrollo</p>
                                    <div>
                                        <p className="mb-1 text-5xl">{cardsData.projects_dev}</p>
                                        <p className="mb-1">Total de avance 22.00%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenedor de los ultimo dos divs */}
                        <div className="flex flex-col w-1/4">
                            {/* Div 3 */}
                            <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl max-h-dvh mb-4">
                                <div className="bg-indigo-400 rounded-lg p-4 text-white">
                                    <p className="text-lg font-bold mb-2">NC's sin resolver</p>
                                    <div>
                                        <p className="mb-1 text-5xl">{cardsData.peding_nc}</p>
                                        <p className="mb-1">Ultima NC registrada hace 1 dia</p>
                                    </div>
                                </div>
                            </div>
                            {/* Div 4 */}
                            <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl max-h-dvh">
                                <div className="bg-red-500 rounded-lg p-4 text-white">
                                    <p className="text-lg font-bold mb-2">Cantidad de Errores</p>
                                    <div>
                                        <p className="mb-1 text-5xl">{cardsData.errors_deploy}</p>
                                        <p className="mb-1">Ultimo error hace 2 horas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2>Reporte CPU</h2>
                        <div style={{ width: '700px', height: '500px' }}>
                            <CpuReport />
                        </div>
                    </div>
                </div>
                <div className="ml-8">
                    <h2>Grafico de Commits</h2>
                    <div style={{ width: '800px', height: '400px' }}>
					<Commits commitsData={commitsData} />
                    </div>
                    <div className="flex justify-center">
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DashboardContent;
