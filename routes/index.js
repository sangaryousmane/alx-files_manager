import AppController from '../controllers/AppController.js';
import UsersController from '../controllers/UsersController.js';

import { Router } from 'express';

function routes (app) {
  const router = Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  router.post("/users", (req, res) => {
   UsersController.postNew(req, res);
  }
}
export default routes;
