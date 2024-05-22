'use strict';

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path';
import fs from 'fs';
import { dbConnection } from './mongo.js'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hoteles/hotel.routes.js'
import habitacionesRoutes from '../src/bedrooms/bedrooms.routes.js'
import reservacionRoutes from '../src/reservations/reservations.routes.js'
import eventRoutes from '../src/events/event.routes.js'
import resourceRoutes from '../src/resource/resource.routes.js'
import { newUser } from '../src/user/user.controller.js'

class Server {

    constructor() {

        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/hoteles/v1/user';
        this.authPath = '/hoteles/v1/auth';
        this.hotelPath = '/hoteles/v1/hotel';
        this.habitacionPath = '/hoteles/v1/habitaciones';
        this.reservacionPath = '/hoteles/v1/reservacion';
        this.eventPath = '/hoteles/v1/event';
        this.resourcePath = '/hoteles/v1/resource';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        await newUser();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use('/uploads', express.static('uploads'));
        this.app.get('/uploads/:imageName', (req, res) => {
            const { imageName } = req.params;
            const imagePath = path.join(__dirname, 'uploads', imageName);

            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    return res.status(404).json({ error: 'Image not found' });
                }

                res.writeHead(200, { 'Content-Type': 'image/png' }); // Modifica el tipo de contenido según el tipo de imagen que estés sirviendo
                res.end(data);
            });
        });
    }

    routes() {
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.hotelPath, hotelRoutes);
        this.app.use(this.habitacionPath, habitacionesRoutes);
        this.app.use(this.reservacionPath, reservacionRoutes);
        this.app.use(this.eventPath, eventRoutes);
        this.app.use(this.resourcePath, resourceRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;