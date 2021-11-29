import express, { Application, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { websiteRouter } from './routes/website.routing';
import { get404 } from './controllers/error.controller';


const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions =
  {
    origin: allowedOrigins
  };

const app: Application = express(),
  limiter = rateLimit(
    {
      max: 15,
      windowMs: 60 * 1000,
      message: 'You are in block list IPs'
    });


app.set('view engine', 'ejs');
app.set('views', (path.join(__dirname, '../views')));

app.use(cors(options));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/user', limiter);

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.json({ limit: '10kb' }));

app.use((req: any, res: Response, next: NextFunction) =>
{
  req.requestTime = new Date().toISOString();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/', websiteRouter);
app.use(get404);

export const webapp = app;
