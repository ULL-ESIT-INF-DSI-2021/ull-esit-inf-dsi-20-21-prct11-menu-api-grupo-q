import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import {platoSchema} from '../models/Platos/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';
import { Platos } from '../models/Platos/platos';
import { Menu } from '../models/Menu/menus';
import { Ingrediente } from '../models/Ingredientes/ingredientes';
import { IngredienteJSON } from '../models/Ingredientes/tiposDefinidos';
import { PlatoJSON } from '../models/Platos/tiposDefinidos';
import { send } from 'process';


export const postRouter = express.Router();


postRouter.post('/ingredients', (req, res) => {
  const ingrediente = new ingredientSchema(req.body);

  ingrediente.save().then((ingrediente) => {
    res.status(201).send(ingrediente);
  }).catch(() => {
    res.status(400).send({
      error: 'Solicitud Incorrecta'
    });
  });
});


postRouter.post('/courses', (req, res) => {
  let aux: [Ingrediente, number][] = [];

  req.body.ingredientes.forEach((ingrediente: [IngredienteJSON, number]) => {
    const filter = {"nombre": ingrediente[0].nombre};
    ingredientSchema.findOne(filter).then((ingredient) => {
      if (ingredient == null) {
        res.status(406).send({
          error: 'No se acepta que un ingrediente sea nulo o esté vacío'
        });
      } 
      else {
        let cadena = ingredient.toString();
        let nombreIngrediente = cadena.substring(cadena.indexOf('nombre:')+9, cadena.indexOf('precio:')-5);
        let numGrupoAlimenticio = parseInt(cadena.substring(cadena.indexOf('numGrupo:')+10, cadena.indexOf('numGrupo:')+12));
        let numLipidos = parseFloat(cadena.substring(cadena.indexOf('lipidos:')+9, cadena.indexOf(', hCarbono')));
        let numCarbono = parseFloat(cadena.substring(cadena.indexOf('hCarbono:')+10, cadena.indexOf(', proteinas')));
        let numProteinas = parseFloat(cadena.substring(cadena.indexOf('proteinas:')+11, cadena.indexOf(', kCal')));
        let numKCal = parseFloat(cadena.substring(cadena.indexOf('kCal:')+6, cadena.indexOf('localizacion:')-6));
        let nombreCiudad = cadena.substring(cadena.indexOf('ciudad:')+9, cadena.indexOf('pais')-3);
        let nombrePais = cadena.substring(cadena.indexOf('pais:')+7, cadena.indexOf("_id")-7);
        let numPrecio = parseFloat(cadena.substring(cadena.indexOf('precio:')+8));
        let auxIngrediente = new Ingrediente(nombreIngrediente, numGrupoAlimenticio, [numLipidos, numCarbono, numProteinas, numKCal], [nombreCiudad, nombrePais], numPrecio);
        aux.push([auxIngrediente, ingrediente[1]]);

        if (req.body.ingredientes.length == aux.length) {
          const plato = new Platos(req.body.nombre, aux, req.body.categoria);
          const platoAIntroducir = new platoSchema(plato);

          platoAIntroducir.save().then((plato) => {
            res.status(201).send(plato);
          }).catch(() => {
            res.status(400).send({
              error: 'Solicitud Incorrecta'
            });
          });
        }
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
  });
});


postRouter.post('/menus', (req, res) => {

  let auxVecPlatos: Platos[] = [];

  req.body.platos.forEach((platoEntrada: PlatoJSON) => {
    const filter = {"nombre": platoEntrada};

    platoSchema.findOne(filter).then((plato) => {
      if (plato == null) {
        res.status(406).send({
          error: 'No se acepta que un plato sea nulo o esté vacío'
        });
      } 
      else {
        auxVecPlatos.push(plato);

        if (req.body.platos.length == auxVecPlatos.length) {
          const menu = new Menu(req.body.nombre, auxVecPlatos);
          const menuAIntroducir = new menuSchema(menu);

          menuAIntroducir.save().then((menu) => {
            res.status(201).send(menu);
          }).catch(() => {
            res.status(400).send({
              error: 'Solicitud Incorrecta'
            });
          });
        }
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
  });
});