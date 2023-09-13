import { createMessageRouter } from './message/create-message-teste.routes';

const createRoutes = (app) => {
  createMessageRouter(app)
};

export { createRoutes };
