const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// CORS TOTAL
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Headers manuales extra
app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use('/public', express.static(process.cwd() + '/public'));

const upload = multer({
  storage: multer.memoryStorage()
});

// HOME
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// API
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  if (!req.file) {
    return res.json({
      error: 'No file uploaded'
    });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor activo en puerto ' + listener.address().port);
});