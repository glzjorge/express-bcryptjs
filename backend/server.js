// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { md5, sha1, sha256, sha3_256 } = require('hash-wasm');
const mysql = require('mysql');
const db = require('../bd/db');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Aquí deberías buscar el usuario en la base de datos
  // Por simplicidad, no incluiré esta parte en este ejemplo

  // Comparar contraseña con la almacenada en texto plano
  if (password === "password") {
    res.status(200).send('¡Inicio de sesión exitoso con contraseña en texto plano!');
  } else {
    res.status(401).send('Credenciales incorrectas');
  }
});

// Esta ruta es solo para demostración, no se debe usar en producción
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash de la contraseña con diferentes algoritmos
  const bcryptHash = await bcrypt.hash(password, 10);
  const md5Hash = await md5(password);
  const sha1Hash = await sha1(password);
  const sha256Hash = await sha256(password);
 // const sha3_256Hash = await sha3_256(password);

  // Guardar en la base de datos
  const sql = `INSERT INTO login (usuario, contraseña, bcryptjs, md5, sha1, sha256, SHA3) VALUES (?, ?, ?, ?, ?, ?, ?)`;
 // db.query(sql, [username, password, bcryptHash, md5Hash, sha1Hash, sha256Hash, sha3_256Hash], (err, result) => {
  db.query(sql, [username, password, bcryptHash, md5Hash, sha1Hash, sha256Hash,1], (err, result) => {

    if (err) {
      console.error(err);
      res.status(500).send('Error al registrar usuario');
    } else {
      res.status(200).send('Usuario registrado correctamente');
    }
  });
});

// Mostrar datos almacenados en la base de datos en la página resultados.html
app.get('/resultados', (req, res) => {
  const sql = `SELECT * FROM login`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener datos');
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});