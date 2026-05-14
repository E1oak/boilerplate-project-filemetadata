const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// ESTO ES CLAVE: Salta la advertencia de ngrok para freeCodeCamp
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("ngrok-skip-browser-warning", "true");
  next();
});

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