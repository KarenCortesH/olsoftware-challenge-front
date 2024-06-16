import axios from 'axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:4000/api/login', { username, password });
        return response.data;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.response.data.message);
    }
}
