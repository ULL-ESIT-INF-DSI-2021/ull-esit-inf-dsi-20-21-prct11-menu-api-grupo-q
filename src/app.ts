import * as express from 'express';
import {join} from 'path';
import {readIngrediente} from './ingredientesWL';
import * as fs from 'fs';

const path = require('path')
const app = express();

app.use(express.static(join(__dirname, '../public')));

app.get('/ingredientes.html', (req, res) => {
  if (!req.query.nameIngredient) {
    res.send({
      error: 'A name ingredient has to be provided',
    });
  } else {
    readIngrediente(req.query.nameIngredient as string, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (!data!.success) {
        res.send({
          error: `No note was found`,
        });
      } else {
        let fichero = fs.readFileSync("./public/plantilla-ingredientes.html").toString();

        if (data != undefined && data.ingredientes != undefined) {
          fichero = fichero.replace('NOMBREINGREDIENTE', data.ingredientes[0].getNombre());
          fichero = fichero.replace('GRUPOINGREDIENTE', data.ingredientes[0].getGrupoAlimenticio().grupo.toString());
          fichero = fichero.replace('CALORIASINGREDIENTE', data.ingredientes[0].getComposicionNutricional().kCal.toString());
          fichero = fichero.replace('HIDRATOSINGREDIENTE', data.ingredientes[0].getComposicionNutricional().hCarbono.toString());
          fichero = fichero.replace('LIPIDOSINGREDIENTE', data.ingredientes[0].getComposicionNutricional().lipidos.toString());
          fichero = fichero.replace('PROTEINASINGREDIENTE', data.ingredientes[0].getComposicionNutricional().proteinas.toString());
          fichero = fichero.replace('PAISORIGENINGREDIENTE', data.ingredientes[0].getLocalizacion().pais);
          fichero = fichero.replace('CIUDADINGREDIENTE', data.ingredientes[0].getLocalizacion().ciudad);
        }

        fs.writeFileSync("./public/plantilla-ingredientes-salida.html", fichero);
        res.sendFile(path.resolve(__dirname, '../public/plantilla-ingredientes-salida.html'));
      }
    });
  }

  
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});