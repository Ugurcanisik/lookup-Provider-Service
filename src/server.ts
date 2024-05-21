import cors from 'cors';
import 'dotenv/config';
import AppRoutes from './routes';
import { Postgres } from '@database';
import DBConfig from '@config/database.config.json';
import { AddressInfo } from 'net';
import baseConfig from '../base-config';
import express, { Express, Router } from 'express';
import { Logger } from '@helpers';
import * as queue from './queue';
import { country as countryService } from '@services';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json';

class Server {
    private _app: Express;
    private readonly _router: Router;
    private readonly _domain: string;
    private readonly _version: string;
    constructor() {
        this._app = express();
        this._domain = 'api';
        this._version = 'v1';
        this._router = express.Router();
    }

    applyMiddleware() {
        this._app.use(express.json());
        return this;
    }

    applyRoutes() {
        this._router.use(`/${this._domain}/${this._version}`, AppRoutes);
        this._app.use(this._router);
        return this;
    }

    enableCORS() {
        this._app.use(cors({ origin: '*' }));
        return this;
    }

    enablePG() {
        new Postgres().setConfig(DBConfig).initializeDB(true, { force: true });
        return this;
    }

    enableLogger() {
        new Logger().initialize();
        return this;
    }

    enableSwagger() {
        this._app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
        console.log(`Swagger URL: http://127.0.0.1:${baseConfig.SERVER_PORT}/api-docs`);
        return this;
    }

    importCSV() {
        setTimeout(
            async () => {
                await countryService.bulkCreateCountries();
            },
            baseConfig.ENV === 'docker' ? 10000 : 2000
        );
        return this;
    }

    enableQueueConsumer() {
        setTimeout(
            () => {
                queue
                    .start()
                    .then(() => {
                        console.log(`Queue Consumer Started!`);
                    })
                    .catch((err: string) => {
                        console.log(`err: ${err}`);
                    });
            },
            baseConfig.ENV === 'docker' ? 9000 : 0
        );
        return this;
    }

    listen() {
        const server = this._app.listen(baseConfig.SERVER_PORT, () => {
            const { address, port } = server.address() as AddressInfo;
            try {
                console.log(`Node version: ${process.version}`);
            } catch (ignored) {
                console.log(`Node version error: ${ignored}`);
            }
            console.log(`Lookup Provider Service app listening at ${port} port`);
            console.log(`API URL: http://127.0.0.1:${port}/${this._domain}/${this._version}`);
        });
        return server;
    }
}

export default Server;
