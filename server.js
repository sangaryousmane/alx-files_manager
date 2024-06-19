import routesStore from './routes/index.js';
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
routesStore(app);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

export default app;
