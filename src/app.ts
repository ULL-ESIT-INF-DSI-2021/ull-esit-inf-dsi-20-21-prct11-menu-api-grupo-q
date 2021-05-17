import * as express from 'express';

const app = express();

app.get('', (_, res) => {
  res.send('Hello World');
});

app.get('/ingredientes', (_, res) => {
  //res.send({hola: "holabb", adios: "adiosbb"});
  res.send('<h1> Bienvenido/a a los ingredientes</h1>  <br><h3>Los ingredientes </h3>');
});

app.get('/information', (_, res) => {
    res.send({hola: "holabb", adios: "adiosbb"});
});

app.get('/notes', (_, res) => {
  res.send({
    notes: [
      {
        title: 'Blue note',
        body: 'This is a blue note',
        color: 'blue',
      },
      {
        title: 'Yellow note',
        body: 'This is a yellow note',
        color: 'yellow',
      },
    ],
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});