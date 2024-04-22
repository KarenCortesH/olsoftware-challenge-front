import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { FaEraser } from 'react-icons/fa';
import axios from 'axios';
import ModalUser from '../components/ModalUser';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                setUsuarios(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar los Usuarios');
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/users/${userId}`);
            const updatedUsuarios = usuarios.filter(user => user.id !== userId);
            setUsuarios(updatedUsuarios);
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

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
        <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="overflow-x-auto flex-grow">
                <Navbar />
                <div className="flex justify-end m-4">
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Nuevo Usuario
                    </button>
                </div>
                <ModalUser isOpen={isModalOpen} onClose={closeModal} />
                <div className="overflow-y-auto bg-white rounded-lg p-4 max-w-screen-xl max-h-dvh mx-0 ml-auto">
                    <h1 className="text-3xl font-sans mb-6">Usuarios</h1>
                    <table className="w-full table-auto divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL_FOTO</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tecnologias</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {usuarios.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.url_photo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.last_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.rol}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.list}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.area}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleDelete(user.id)} className="text-red-500 font-semibold bg-transparent border-red-500 hover:border-transparent hover:bg-red-500 text-sm py-2 px-4 rounded">
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

export default Usuarios;
