import jsonServer from 'json-server';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import express from 'express';

const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware para parsear JSON
server.use(express.json());

// Clave secreta para firmar el token JWT
const SECRET_KEY = '1234567890axaxax';

// Middleware para proteger rutas
server.use((req, res, next) => {
    if (req.method === 'POST' && req.url === '/api/login') {
        return next();
    }

    if (req.method === 'POST' && req.url === '/api/users') {
        return next();
    }

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const result = jsonwebtoken.verify(token, SECRET_KEY);

            const { username } = result;

            const user = router.db.get('users').find({ username }).value();

            if (!user) {
                return res.status(401).json({ message: 'usuario no encontrado' });
            }

            // Verificar el rol del usuario para operaciones que no sean GET
            if (req.method !== 'GET' && (user.rol !== 1 && user.rol !== '1' && user.rol !== 'Admin')) {
                return res.status(401).json({ message: 'usuario no autorizado' });
            }

            next();
        } catch (err) {
            res.status(401).json({ message: 'token invalido' });
        }
    } else {
        res.status(401).json({ message: 'no se proporciono token' });
    }
});

// Rutas para usuarios
server.post('/api/users', (req, res) => {
    const db = router.db;

    const { username, password } = req.body;

    const user = db.get('users').find({ username }).value();

    if (user) {
        return res.status(409).json({ message: 'usuario ya existe' });
    }

    const hashedPassword = bcryptjs.hashSync(password, 8);

    db.get('users').push({ ...req.body, password: hashedPassword }).write();

    res.json({ message: 'usuario creado' });
});

// Ruta para login de usuarios
server.post('/api/login', (req, res) => {
    const db = router.db;

    const { username, password } = req.body;

    const user = db.get('users').find({ username }).value();

    if (!user) {
        return res.status(404).json({ message: 'usuario no encontrado' });
    }

    if (!user.password) {
        return res.status(409).json({ message: 'usuario no tiene password' });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'credenciales incorrectas' });
    }

    const token = jsonwebtoken.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Rutas para proyectos
server.get('/api/projects', (req, res) => {
    const projects = router.db.get('projects').value();
    res.json(projects);
});

server.post('/api/projects', (req, res) => {
    const db = router.db;
    const newProject = req.body;

    db.get('projects').push(newProject).write();
    res.json({ message: 'Proyecto creado', project: newProject });
});

server.put('/api/projects/:id', (req, res) => {
    const db = router.db;
    const { id } = req.params;
    const updatedProject = req.body;

    db.get('projects').find({ id: parseInt(id) }).assign(updatedProject).write();
    res.json({ message: 'Proyecto actualizado', project: updatedProject });
});

server.delete('/api/projects/:id', (req, res) => {
    const db = router.db;
    const { id } = req.params;

    db.get('projects').remove({ id: parseInt(id) }).write();
    res.json({ message: 'Proyecto eliminado' });
});

server.use(router);

server.listen(4000, () => {
    console.log('JSON Server is running on port 4000');
});
