const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// 1. MEJORA: Middleware de cabeceras al principio de todo
app.use((req, res, next) => {
  // Esto permite que el navegador de freeCodeCamp lea la respuesta
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Esto fuerza a ngrok a saltarse la pantalla de advertencia
  res.header("ngrok-skip-browser-warning", "true");
  next();
});

// 2. Configuración de CORS
app.use(cors({ optionsSuccessStatus: 200 }));

app.use('/public', express.static(process.cwd() + '/public'));

// Configuración de Multer
const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 3. Ruta de análisis de archivo
// El test 3 exige que el campo se llame 'upfile'
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "No se subió ningún archivo" });
    }

    // El test 4 requiere exactamente name, type y size
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('¡SERVIDOR LISTO EN PUERTO ' + port + '!');
});