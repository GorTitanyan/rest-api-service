import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import winston from "winston"
import { port, allowedOrigin } from './env.dev.js';


import authRouter from './routes/auth.routes.js';
import newsRouter from './routes/news.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();

const corsOptions = {
  origin: allowedOrigin,
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(), // Add console transport
    new winston.transports.File({ filename: 'app.log' }) // Add file transport
  ]
});

// logger.debug('Debug message');
// logger.info('Info message');
// logger.warn('Warning message');
// logger.error('Error message');



app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api', userRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
