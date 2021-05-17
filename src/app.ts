import * as express from 'express';
import {join} from 'path';

const app = express();

// console.log(join(__dirname, '../public')); // sitio por defecto del servidor, lo queremos public.
console.log();

// marcar el directorio public como sitio por defecto del servidor.
app.use(express.static(join(__dirname, '../public')));

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
