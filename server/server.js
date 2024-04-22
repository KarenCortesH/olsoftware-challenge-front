const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db.json'); // Importa tus datos de usuario

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = '1234567890axaxax'; // Clave secreta para firmar el token JWT

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    res.json({ token });
});

server.use(router);
server.listen(4000, () => {
    console.log('JSON Server is running');
});
