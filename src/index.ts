import * as express from 'express';
import {join} from 'path';
import './db/mongoose';
import {getRouter} from './routers/get';

const app = express();
app.use(express.json());
app.use(getRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});