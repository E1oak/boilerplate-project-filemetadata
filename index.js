const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Configuración de CORS mejorada para evitar bloqueos
app.use(cors({ optionsSuccessStatus: 200 }));

// Servir archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Configurar Multer para procesar el archivo en memoria
const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

/**
 * RUTA PARA EL PROYECTO: File Metadata
 * El test espera que el campo del formulario se llame "upfile"
 */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    if (!req.file) {
      return res.json({ error: "Por favor, sube un archivo." });
    }

    // Respuesta JSON con los datos que pide el Test 4
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor al procesar el archivo." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('¡SERVIDOR LISTO EN PUERTO ' + port + '!');
});