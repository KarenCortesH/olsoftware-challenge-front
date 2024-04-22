import React, { useState, useEffect } from 'react';
import { BiSolidCircle, BiCheck } from "react-icons/bi";
import { FaEraser } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import Modal from '../components/Modal';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Estado para controlar la apertura y cierre del modal
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/projects');
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los proyectos');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`http://localhost:4000/projects/${projectId}`);
            // Actualizar la lista de proyectos después de eliminar el proyecto
            const updatedProjects = projects.filter(project => project.id !== projectId);
            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error al eliminar el proyecto', error);
        }
    };

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        // <div className="min-h-screen flex flex-col">
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Renderizar el componente de Sidebar */}
            <Sidebar />

            <div className="overflow-x-auto flex-grow">
                <Navbar />

                {/* Botón para abrir el modal */}
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Nuevo Proyecto
                    </button>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl  max-h-dvh mx-0 ml-auto">
                    <h1 className="text-3xl font-sans mb-6">Lista de Proyectos registrados</h1>
                    <table className="w-full table-auto divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proyecto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repositorio</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Desarrolladores</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CI</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CD</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frontend</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backend</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DB</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alertas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errores</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cant.Despliegues</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avance</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Nc's</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {projects.map(project => (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.project_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.client}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.repo_url}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.developers}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.ci === true ? <BiCheck style={{ color: 'green' }} /> : <BiSolidCircle style={{ color: 'red' }} />}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.cd === true ? <BiCheck style={{ color: 'green' }} /> : <BiSolidCircle style={{ color: 'red' }} />}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.frontend_tecnology}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.backend_tecnology}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{project.databases}</td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'orange' }}>{project.errors_count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'red' }}>{project.warning_count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'blue' }}>{project.deploy_count}</td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'green' }}>{project.percentage_completion}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap" style={{ color: 'red' }}>{project.report_nc}</td>
                                    <td className="px-6 py-4 whitespace-nowrap inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{project.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleDelete(project.id)} className="text-red-500 font-semibold bg-transparent border-red-500 hover:border-transparent hover:bg-red-500 text-sm py-2 px-4 rounded">
                                                <FaEraser style={{ color: '#8045ba' }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Projects;
