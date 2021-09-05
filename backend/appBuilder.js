import express from 'express';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import router from './router';
import { RequestError } from './RequestError';
import { environment } from './config';
import validationHandler from './utils/validationHandler';
import errorHandler from './utils/errorHandler';

const isProduction = environment === 'production';

export default function appBuilder (ports) {
  const apps = {};
  for (const port of ports) {
    const app = express();
    apps[port] = app;
    if (!isProduction) {
      app.use(require('cors')());
      app.use(require('morgan')('dev'));
    }
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(helmet({
      contentSecurityPolicy: false
    }));
    app.use(csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction,
        httpOnly: true
      }
    }));

    app.use((req, res, next) => {
      if (isProduction && req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(`https://${req.get('host')}${req.originalUrl}`);
      } else next();
    });

    app.use(router);

    app.use((_req, _res, next) => {
      const err = new RequestError(
        'Resource Not Found',
        'The requested resource couldn\'t be found.',
        404
      );
      next(err);
    });

    app.use(validationHandler);

    app.use(errorHandler);
  }
  return apps;
}
