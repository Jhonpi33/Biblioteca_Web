import express from 'express';
import memberRoutes from './routes/member.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API Coworking funcionando!' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;