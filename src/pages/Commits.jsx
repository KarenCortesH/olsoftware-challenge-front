import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const CpuReport = () => {
    const [cpuData, setCpuData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/cpu_report');
                const data = await response.json();
                setCpuData(data);
            } catch (error) {
                console.error('Error fetching CPU report data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (cpuData) {
            // Convertir las claves del objeto en un array de fechas y un array de sesiones
            const dates = Object.keys(cpuData);
            const sessions = Object.values(cpuData);

            // Obtener el contexto del lienzo del gráfico
            const ctx = document.getElementById('cpuReportChart').getContext('2d');

            // Crear el gráfico de líneas
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Número total de sesiones',
                        data: sessions,
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
                                unit: 'day' // Puedes ajustar la unidad de tiempo según tus necesidades
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [cpuData]);

    return (
        <div>
            <canvas id="cpuReportChart" width="400" height="200"></canvas>
        </div>
    );
};

export default CpuReport;
