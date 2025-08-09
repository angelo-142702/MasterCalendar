export const app = express();
import express from "express";
import http from "http"
import morgan from "morgan";
import  cookieParser from  "cookie-parser";
import routes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import UserRoutes from './routes/User.routes.js';
import suscriptionsRoutes from './routes/suscirptions.routes.js'
import categoryRoutes from './routes/category.routes.js';
import representanteRoutes from './routes/respresentante.routes.js';
import servicesRoutes from './routes/service.routes.js'; 
import reservations from './routes/reservation.routes.js';
import scheduleRoutes from './routes/schedules.routes.js';
import appointments from './routes/appointments.routes.js';
import Citas from "./routes/citas.routes.js"
import cors from "cors";
import {  Server as SocketServer } from "socket.io";
export const server = http.createServer(app);
export const port = process.env.PORT || 4000;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertir la URL del módulo a una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(morgan("dev"));
// Ejemplo en Node.js con Express
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Cambia esto al origen correcto
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Cambia esto al origen correcto
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
});

app.use(cors({
    origin:"http://localhost:5173",
    credentials:"true",
}))


app.use(express.json());
app.use(cookieParser())
app.use("/api/",routes);
app.use("/api/empresas", adminRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/suscriptions", suscriptionsRoutes);
app.use("/api/category", categoryRoutes );
app.use("/api/repre", representanteRoutes );
app.use("/api/service", servicesRoutes );
app.use('/api/schedules', scheduleRoutes);
app.use('/api/appointments', appointments);
app.use('/api/reservation', reservations);
app.use('/api/citas', Citas);

