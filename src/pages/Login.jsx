import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { login } from '../../server/controllers/login.controllers';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await login(username, password);
            console.log('Usuario autenticado:', data);
            // Establecer el estado loggedIn a true después del inicio de sesión exitoso
            setLoggedIn(true);
        } catch (error) {
            setError(error.message);
        }
    };

    // Si loggedIn es true, redirigir al usuario a la página Home
    if (loggedIn) {
        navigate('/home');
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md m-4 flex items-center">
                        <img src={logo} className="h-8 mr-2" alt="Logo" />
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md m-4">
                        <h2 className="text-left text-balance font-bold text-gray-900">Bienvenido al gestor de proyectos!</h2>
                        <h2 className="text-left text-balance font-sans text-gray-900">Necesitamos tu usuario y constraseña</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="user" className="block text-sm font- text-gray-700">
                                Nombre de usuario:
                            </label>
                            <div className="mt-1">
                                <input id="user" placeholder="Nombre de usuario Ej: nombre.apellido" name="user" type="text" autoComplete="user" required className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña:
                            </label>
                            <div className="mt-1">
                                <input id="password" placeholder="Aqui va tu contraseña" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Ingresar
                            </button>
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        <div>
                            <label>
                                <input type="checkbox" name="rememberMe" className='mr-2'/>
                                <span className='text-center font-thin text-sm'>Permanecer Conectado</span>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
