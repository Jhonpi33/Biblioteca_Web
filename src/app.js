import express from 'express';
import { fileURLToPath } from 'url';  // necesario para obtener __dirname en ES6 Modules
import { dirname, join } from 'path'; // para construir rutas de carpetas
import memberRoutes from './routes/member.routes.js';
import roomRoutes from './routes/room.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import authRoutes from './routes/auth.routes.js';

// En ES6 Modules no existe __dirname, hay que construirlo así
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

// Le dice a Express que sirva los archivos de la carpeta "public"
// Cuando alguien abra / va a buscar index.html ahí
app.use(express.static(join(__dirname, '../public')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;