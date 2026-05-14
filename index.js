const express = require('express');
const cors = require('cors');
const multer = require('multer'); // El paquete que recomienda freeCodeCamp
const upload = multer(); // Configuración básica para guardar en memoria
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA PARA EL TEST
// El campo del formulario debe tener name="upfile" como dice tu captura
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No se subió ningún archivo" });
  }

  // Devolvemos el JSON con los datos que pide el test 4
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Tu app está lista en el puerto ' + port);
});