import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Commits = () => {
    const [commitData, setCommitData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
				const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/api/cpu_report',{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
                setCommitData(response.data);
            } catch (error) {
                console.error('Error fetching commit report data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (commitData) {
            // Extraer fechas y cantidad de commits del objeto de datos
            const dates = commitData.map(commit => commit.date);
            const counts = commitData.map(commit => commit.count);

            // Obtener el contexto del canvas del gráfico
            const ctx = document.getElementById('commitsReportChart').getContext('2d');

            // Crear instancia de gráfico de línea
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Número de Commits',
                        data: counts,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
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
        }
    }, [commitData]);

    return (
        <div>
            <h2>Reporte de Commits</h2>
            <canvas id="commitsReportChart" width="800" height="400"></canvas>
        </div>
    );
};

export default Commits;
