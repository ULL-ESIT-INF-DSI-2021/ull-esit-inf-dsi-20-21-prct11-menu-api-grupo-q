import * as express from 'express';
import {join} from 'path';
import './db/mongoose';
import {getRouter} from './routers/get';
import {postRouter} from './routers/post';
import {patchRouter} from './routers/patch';
import {deleteRouter} from './routers/delete';
import {defaultRouter} from './routers/default';


const app = express();
app.use(express.json());
app.use(getRouter);
app.use(postRouter);
app.use(deleteRouter);
app.use(patchRouter);
app.use(defaultRouter);


const port = process.env.PORT || 8080;


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});