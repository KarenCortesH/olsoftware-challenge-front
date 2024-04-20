import React from 'react';
import logo from '../assets/logo.png'

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md m-4 flex items-center">
                        <img src={logo} className="h-8 mr-2" />
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md m-4">
                        <h2 className="text-left text-balance font-bold text-gray-900">Bienvenido al gestor de proyectos!</h2>
                        <h2 className="text-left text-balance font-sans text-gray-900">Necesitamos tu usuario y constraseña</h2>
                    </div>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="user" className="block text-sm font- text-gray-700">
                            </label>
                            <div className="mt-1">
                                <input id="user" placeholder="Nombre de usuario Ej: nombre.apellido" name="user" type="user" autoComplete="user" required className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            </label>
                            <div className="mt-1">
                                <input id="password" placeholder="Aqui va tu contraseña" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Ingresar
                            </button>
                        </div>
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
