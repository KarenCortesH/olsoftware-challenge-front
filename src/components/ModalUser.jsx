import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const ModalUser = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        url_photo: '',
        rol: '',
        list: [],
        area: ''
    });

    const handleChange = ({ target }) => {
        const { name, value, type, checked } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (selectedOptions, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedOptions.map(option => option.value),
        }));
    };

    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/users', formData);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                onClose();
                setFormData({
                    name: '',
                    last_name: '',
                    url_photo: '',
                    rol: '',
                    list: [],
                    area: ''
                });
            }, 3000);
        } catch (error) {
            console.error('Error al guardar el Usuario:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-5${isOpen ? '' : ' hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-xl z-50">
                <h2 className="text-xl font-normal mb-4">Crear un Nuevo Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="url_photo" className="block text-sm font-medium text-gray-700">
                            Foto
                        </label>
                        <input
                            type="text"
                            id="url_photo"
                            name="url_photo"
                            required
                            value={formData.url_photo}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                            Rol
                        </label>
                        <Select
                            id="rol"
                            name="rol"
                            value={{ label: formData.rol, value: formData.rol }}
                            onChange={(selectedOption) => setFormData({ ...formData, rol: selectedOption.value })}
                            options={[
                                { label: 'Admin', value: 'Admin' },
                                { label: 'Dev', value: 'Dev' }
                            ]}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="list" className="block text-sm font-medium text-gray-700">
                            Tecnologías
                        </label>
                        <Select
                            id="list"
                            name="list"
                            value={formData.list.map(tech => ({ label: tech, value: tech }))}
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'list')}
                            options={[
                                { label: 'React', value: 'React' },
                                { label: 'Node.js', value: 'Node.js' },
                                { label: 'Python', value: 'Python' }
                            ]}
                            isMulti
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                            Área
                        </label>
                        <input
                            type="text"
                            id="area"
                            name="area"
                            required
                            value={formData.area}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 mr-2"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
                {showAlert && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">¡Éxito!</strong>
                        <span className="block sm:inline"> Usuario guardado.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setShowAlert(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Cerrar</title><path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.708L9.293 10l-3.64 3.641a.5.5 0 1 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.648a.5.5 0 0 0 0-.7z" /></svg>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalUser;
