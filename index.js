const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected');

  // Simulación del viaje del taxi
  const startLocation = { lat: 37.7749, lng: -122.4194 };
  const endLocation = { lat: 37.7849, lng: -122.4094 };
  const totalSteps = 100;
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep <= totalSteps) {
      const lat = startLocation.lat + (endLocation.lat - startLocation.lat) * (currentStep / totalSteps);
      const lng = startLocation.lng + (endLocation.lng - startLocation.lng) * (currentStep / totalSteps);
      const location = { latitude: lat, longitude: lng };
      socket.emit('locationUpdate', location);
      currentStep++;
    } else {
      clearInterval(interval);
    }
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
