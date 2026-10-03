const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const planRoutes = require('./routes/planRoutes');
const membresiaRoutes = require('./routes/membresiaRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // permite leer JSON en req.body

// Ruta de salud, para comprobar rápido que el servidor está vivo
app.get('/api/health', (req, res) => {
  res.json({ estado: 'ok', mensaje: 'API de FitControl funcionando.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/planes', planRoutes);
app.use('/api/membresias', membresiaRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada.' });
});

module.exports = app;
