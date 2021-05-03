import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

// SWAGGER IMPORTS
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import definitions from './swagger.json';

// IMPORT ROUTES

const swaggerOptions = {
  explorer: true,
  swaggerDefinition: {
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development Server',
      },
    ],
    info: {
      title: 'Cadena Campo API',
      version: '1.0.0',
      description: 'Cadena Campo API information.',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions,
  },
  apis: ['./**/*.routes.js'],
};

class Server {
    public app: express.Application;
  
    constructor() {
        /* Inicializaciones esenciales como conexiones con la DB, 
        rutas, config de middleware que se pueden hacer en metodos aparte (por prolijidad)*/
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect('mongodb://localhost:27017/nutriama', { useNewUrlParser: true, useUnifiedTopology: true }); 
        this.config();
        this.routes();
    }
  
    config() {
        /* middleware y dependencias importantes para nuestra app */
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(
        express.urlencoded({
            extended: false,
        })
        );
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }
  
    routes(){
        /* las rutas de la app */
        // this.app.use('', AuthRoutes);
    }
  
    start() {
      this.app.listen(this.app.get('port'), () => {
        /* cosas que se hagan despues del start */
        const swaggerDocs = swaggerJsDoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
      });
    }
  }
  
  // CREAMOS UN NUEVO OBJETO DE LA CLASE SERVER Y LO STARTEAMOS
  const server = new Server();
  server.start();