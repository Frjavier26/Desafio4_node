const { Pool } = require('pg')

const pool = new Pool({
host: 'localhost',
user: process.env.PGUSER,
password: process.env.PGPASSWORD,
database: process.env.PGDATABASE,
port: process.env.PGPORT,
allowExitOnIdle: true
})

const agregarPost = async (titulo, img, descripcion) => {   //(titulo, url, descripcion) 
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3)"
    const values = [titulo, img, descripcion]  // [titulo, url, descripcion]
    const result = await pool.query(consulta, values)
    console.log('Post agregado con exito')
    return result 
    }
//agregarPost("hola", "ndcnjdnjcdnjd.cl", "jcndjncjn");
    
const obtenerPost = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    console.log(rows)
    return rows
}
//obtenerPost();

const modificarPost = async (descripcion, id ) => {
    const consulta = "UPDATE posts SET descripcion = $1 WHERE id = $2 "
    const values = [descripcion , id]
    const { rowCount } = await pool.query(consulta, values)
    if (rowCount === 0) {
        throw { code: 404, message: "No se consiguió ningún Post con este id" }
        }
    
}

const eliminarPost = async (id) =>{
    const consulta = "DELETE FROM posts WHERE id = $1"
    const values =[id]
    const result = await pool.query(consulta, values)
}

const contadorLike = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    const result = await pool.query(consulta, values)
}

module.exports = {agregarPost, obtenerPost, contadorLike, eliminarPost, modificarPost};