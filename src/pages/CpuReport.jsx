import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

const CpuReport = () => {
    const [cpuData, setCpuData] = useState(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
				const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/cpu_report',{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
                setCpuData(response.data);
            } catch (error) {
                console.error('Error fetching CPU report data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (cpuData && cpuData.time) {
            const dates = [];
            const sessions = [];
            const projectsDeployed = [];
            const cpuUsage = [];

            for (const entry of cpuData.time) {
                // Convertir la cadena de fecha a un objeto Date de JavaScript
                const dateParts = entry.time.split('/');
                const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

                dates.push(date);
                sessions.push(entry.value);
                projectsDeployed.push(entry.deploys);
                cpuUsage.push(entry.percentaje_time);
            }

            const ctx = document.getElementById('cpuReportChart').getContext('2d');

            if (chartInstance) {
                chartInstance.destroy(); // Destruye el gráfico existente si ya existe
            }

            const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Numero total de sesiones',
                        data: sessions,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }, {
                        label: 'Proyectos desplegados',
                        data: projectsDeployed,
                        fill: false,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }, {
                        label: 'Uso de CPU (%)',
                        data: cpuUsage,
                        fill: false,
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            setChartInstance(newChartInstance); // Almacena la instancia del gráfico para poder destruirla más tarde si es necesario
        }
    }, [cpuData]);

    return (
        <div>
            <canvas id="cpuReportChart" width="400" height="200"></canvas>
        </div>
    );
};

export default CpuReport;
