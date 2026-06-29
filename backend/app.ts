import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { HTTP_STATUS, ENVIRONMENTS } from './utils/constants';
import { globalErrorHandler } from './middlewares/errorMiddleware';
import { Request, Response, NextFunction } from 'express';

const app = express();

app.use(helmet());

const allowedOrigins = [
    'https://phone-comparor-web.onrender.com',
    'http://localhost:3000',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    maxAge: 7200
}));

if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.get('/health', (req, res) => {
    res.status(HTTP_STATUS.OK).json({ status: 'OK', timestamp: new Date() });
});

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));

app.use('*', (req, res, next) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
        status: err.status || 'error',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT && { stack: err.stack })
    });
});
app.use(globalErrorHandler);

export default app;