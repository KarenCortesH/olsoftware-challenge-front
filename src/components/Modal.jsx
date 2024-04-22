import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        project_name: '',
        repo_url: '',
        client: '',
        developers: [],
        ci: false,
        cd: false,
        frontend_tecnology: [],
        backend_tecnology: [],
        databases: '',
        errors_count: 0,
        warning_count: 0,
        deploy_count: 0,
        percentage_completion: 0,
        report_nc: 0,
        status: 'En Desarrollo',
    });


    const handleChange = ({ target }) => {
        const { name, value, type, checked } = target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    //Select
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
            await axios.post('http://localhost:4000/projects', {
                ...formData,
                ci: formData.ci || undefined,
                cd: formData.cd || undefined,
            });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                onClose(); // Cerrar modal después de mostrar la alerta
                setFormData({
                    project_name: '',
                    repo_url: '',
                    client: '',
                    developers: [],
                    frontend_tecnology: [],
                    backend_tecnology: [],
                    databases: '',
                    ci: false,
                    cd: false,
                    errors_count: 0,
                    warning_count: 0,
                    deploy_count: 0,
                    percentage_completion: 0,
                    report_nc: 0,
                    status: 'En Desarrollo',
                });
            }, 3000);
        } catch (error) {
            console.error('Error al guardar el proyecto:', error);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-5${isOpen ? '' : ' hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-xl z-50">
                <h2 className="text-xl font-normal mb-4">Creemos un Nuevo Proyecto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">
                            Proyecto
                        </label>
                        <input
                            type="text"
                            id="project_name"
                            name="project_name"
                            required
                            value={formData.project_name}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                            Cliente
                        </label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            required
                            value={formData.client}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="repo_url" className="block text-sm font-medium text-gray-700">
                            Repositorio
                        </label>
                        <input
                            type="text"
                            id="repo_url"
                            name="repo_url"
                            required
                            value={formData.repo_url}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ci" className="flex items-center text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                id="ci"
                                name="ci"
                                checked={formData.ci}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Tiene Integración Continua
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cd" className="flex items-center text-sm font-medium text-gray-700">
                            <input
                                type="checkbox"
                                id="cd"
                                name="cd"
                                checked={formData.cd}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Tiene Despliegue Continuo
                        </label>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="developers" className="block text-sm font-medium text-gray-700">
                            Desarrolladores
                        </label>
                        <Select
                            id="developers"
                            name="developers"
                            value={formData.developers.map(dev => ({ label: dev, value: dev }))}
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'developers')}
                            options={[{ label: 'Developer A', value: 'Developer A' },
                            { label: 'Developer B', value: 'Developer B' },
                            { label: 'Developer C', value: 'Developer C' },]}
                            isMulti
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="frontend_tecnology" className="block text-sm font-medium text-gray-700">
                            Frontend
                        </label>
                        <Select
                            id="frontend_tecnology"
                            name="frontend_tecnology"
                            value={formData.frontend_tecnology.map(dev => ({ label: dev, value: dev }))}
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'frontend_tecnology')}
                            options={[{ label: 'Angular', value: 'Angular' },
                            { label: 'React', value: 'React' },
                            { label: 'VueJs', value: 'VueJs' },]}
                            isMulti
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="backend_tecnology" className="block text-sm font-medium text-gray-700">
                            Backend
                        </label>
                        <Select
                            id="backend_tecnology"
                            name="backend_tecnology"
                            value={formData.backend_tecnology.map(dev => ({ label: dev, value: dev }))}
                            onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'backend_tecnology')}
                            options={[{ label: '.Net', value: '.Net' },
                            { label: 'Java', value: 'Java' },
                            { label: 'NodeJs', value: 'NodeJs' },]}
                            isMulti
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="databases" className="block text-sm font-medium text-gray-700">
                            Base de Datos
                        </label>
                        <input
                            type="text"
                            id="databases"
                            name="databases"
                            required
                            value={formData.databases}
                            onChange={handleChange}
                            className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 mr-2"
                        >
                            Guardar cambios
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
                {showAlert && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">¡Éxito!</strong>
                        <span className="block sm:inline"> Proyecto guardado.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={() => setShowAlert(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a.5.5 0 0 0-.707 0L10 9.293 6.359 5.652a.5.5 0 0 0-.707.708L9.293 10l-3.64 3.641a.5.5 0 1 0 .707.707L10 10.707l3.641 3.641a.5.5 0 0 0 .707-.707L10.707 10l3.641-3.648a.5.5 0 0 0 0-.7z" /></svg>
                        </span>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Modal;
