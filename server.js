// server.js
const express = require('express');
const axios = require('axios'); // Importa axios
const app = express();
const PORT = 3000;

// Middleware para permitir solicitudes CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Ruta para obtener datos desde el servicio web de Pure
app.get('/api/research', async (req, res) => {
  try {
    // Utiliza axios para realizar la solicitud
    const response = await axios.get('https://cris.unfv.edu.pe/ws/api/research-outputs?size=10', {
      headers: {
        'Content-Type': 'application/json',
        'api-key': '763e40e0-407e-41c3-b1d4-7cfe70a85b03'
      }
    });

    // Verifica si la respuesta fue exitosa
    if (response.status !== 200) {
      throw new Error('No se pudo obtener los datos de CRIS');
    }

    // Obtén los datos de la respuesta
    const data = response.data;
    // Filtrar datos aquí según sea necesario
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
