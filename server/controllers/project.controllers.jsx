const axios = require('axios');

// URL base para las solicitudes al servidor JSON
const baseUrl = 'http://localhost:4000/projects';

// Crear Proyecto
const createProject = async (req, res) => {
    try {
        const newProject = req.body;
        const response = await axios.post(baseUrl, newProject);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};

// Obtener todos los proyectos
const getProjects = async (req, res) => {
    try {
        const response = await axios.get(baseUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Actualizar un proyecto existente
const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const updatedProject = req.body;
        const response = await axios.put(`${baseUrl}/${projectId}`, updatedProject);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto existente
const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        await axios.delete(`${baseUrl}/${projectId}`);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};

module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};
