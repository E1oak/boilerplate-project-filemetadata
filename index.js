const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// 1. PRIMERO: Forzar cabeceras para saltar ngrok y permitir CORS manualmente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser-warning");
  res.header("ngrok-skip-browser-warning", "true"); // OBLIGATORIO para ngrok free
  
  // Si es una petición de pre-vuelo (OPTIONS), respondemos OK de inmediato
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 2. SEGUNDO: Middleware estándar
app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.json({ error: "Sube un archivo" });
  
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('¡SERVIDOR LISTO EN PUERTO ' + port + '!');
});