import Server from './server';

const app = new Server()
    .enableCORS()
    .applyMiddleware()
    .applyRoutes()
    .enablePG()
    .enableQueueConsumer()
    .enableLogger()
    .enableSwagger()
    .importCSV()
    .listen();

export default app;
