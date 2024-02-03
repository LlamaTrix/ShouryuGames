import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { listaJuegosServidor } from './consulta.js';
import { crearConexion, cerrarConexion } from './conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
//Base de datos
const connection = crearConexion();

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const juegos = await listaJuegosServidor(connection);
    res.render("index.ejs", { juegos: juegos });
  } catch (error) {
    console.error('Error al obtener los juegos:', error.stack);
    res.status(500).send('Hubo un error al obtener los juegos.');
  }
});

app.get("/games", (req, res)=>{
  res.render("games.ejs");
});

app.get("/library", (req, res) => {
  const romsDir = path.join(__dirname, 'public/roms');

  fs.readdir(romsDir, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de ROMs:', err);
      res.status(500).send('Error al leer la carpeta de ROMs');
      return;
    }

    const nesFiles = files.filter(file => file.endsWith('.nes'));
    res.render("library.ejs", { roms: nesFiles });
  });
});

app.get("/account", (req, res)=>{
  res.render("account.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('exit', function() {
  cerrarConexion(connection);
});