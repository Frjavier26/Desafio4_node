const { agregarPost, obtenerPost, modificarPost, eliminarPost, contadorLike } = require("./consultas");
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config()

var bodyParser = require('body-parser')


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server en puerto: http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use = (express.json()); 



app.get("/posts", async (req, res) => {
  const posts = await obtenerPost()
  res.json(posts);
});


app.post("/posts", async (req, res) => {
  try{
    const { titulo, img, descripcion } = req.body    //{ titulo, url, descripcion }
    console.log(req.body)
    await agregarPost(titulo, img, descripcion)     //(titulo, url, descripcion)
    res.send("Post agregado con éxito")
  } catch (error){
    console.log(error)
  }
})


app.put("/posts/:id", async (req, res) => {
  const { id } = req.params
  const { descripcion } = req.query
  try{
    await modificarPost(descripcion, id)
    res.send("Post modificado con éxito")
  } catch ({ code, message }) {
    res.status(code).send(message)
  }
  })


app.put("/posts/:id", async (req, res) => {
    const { id } = req.params
    const likes = await contadorLike(id)
    res.send({likes})
})


app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params
  await eliminarPost(id)
  res.send("Viaje eliminado con exito")
})