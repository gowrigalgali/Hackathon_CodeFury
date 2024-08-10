// server.js
const express = require('express');
const cors = require('cors'); // Import cors
const axios = require('axios');
const app = express();
const port = 5000; // Choose your port

// Apply CORS middleware
app.use(cors());
app.use(express.json());

app.post('/api/send-sms', async (req, res) => {
  try {
    const response = await axios.post('https://sms.api.sinch.com/xms/v1/9f1e4cf8132f41a691f94278f276ffc7/batches', req.body, {
      headers: {
        'Authorization': `Bearer 1b23114d88544c89b03bdec6241c6342`,
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error sending SMS' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
