import express from 'express';
import routingFunc from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

routingFunc(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
