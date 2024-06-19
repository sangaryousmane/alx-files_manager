import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';
import AuthController from '../controllers/AuthController.js';

import { Router } from 'express';

function routesStore (app) {
  const router = Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });
 
  // User controller services
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  router.get("/users/me", (req, res) => {
    UsersController.get(req, res);
  });

  // Authentication service
  router.get("/connect", (req, res) => {
    AuthController.getConnect(req, res);
  });

  router.get("/disconnect", (req, res) => {
   AuthController.getDisconnect(req, res);
  });

}
export default routesStore;
