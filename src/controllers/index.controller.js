const { Pool } = require('pg');

const pool = new Pool({
    
    user: 'apirest_60wn_user',
    host: 'dpg-cf1n2kun6mpkr6c1aum0-a.oregon-postgres.render.com',
    password: '4JUBlZezq27Zheo523ijflxgrBNwWFOm',
    database: 'apirest_60wn',
    port: '5432',
    ssl: true
});

const getUsers = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM usuarios');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const createUser = async (req, res) => {
   const { nombre, edad, email } = req.body;
    const response = await pool.query('INSERT INTO usuarios (nombre, edad, email) VALUES ($1, $2, $3)', [nombre, edad, email]);
    res.json({
        message: 'Usuario agregado correctamente',
        body: {
            user: {nombre, edad, email}
        }
    }) 
};
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, edad, email } = req.body;

    const response =await pool.query('UPDATE usuarios SET nombre = $1, edad = $2, email = $3 WHERE id = $4', [
        nombre,
        edad,
        email,
        id
    ]);
    res.json('usuario actualizado correctamente');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM usuarios where id = $1', [
        id
    ]);
    res.json(`Usuario ${id} eleminado correctamente`);
};


const getUsersPromedioEdad = async (req, res) => {
    const response = await pool.query('SELECT ROUND(AVG(edad)::numeric, 1) FROM usuarios');
    res.status(200).json({ edadPromedio: response.rows[0].round });
};

const systemInfo = {
    nameSystem: 'Api-Users',
    version: '1.0.0',
    developer: 'Jose Luis Mamani Reyes',
    email: 'jhosep.vi.lu@gmail.com',
    celular: '63745863'
};

const getStatus = (req, res) =>{
    res.status(200).json({systemInfo});
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUsersPromedioEdad,
    getStatus
}