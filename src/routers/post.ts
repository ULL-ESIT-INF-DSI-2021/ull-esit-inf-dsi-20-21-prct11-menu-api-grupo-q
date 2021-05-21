import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import {platoSchema} from '../models/Platos/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';
import { Platos } from '../models/Platos/platos';
import { Ingrediente } from '../models/Ingredientes/ingredientes';
import { IngredienteJSON } from '../models/Ingredientes/tiposDefinidos';


export const postRouter = express.Router();


postRouter.post('/ingredients', (req, res) => {
  const ingrediente = new ingredientSchema(req.body);

  ingrediente.save().then((ingrediente) => {
    res.status(201).send(ingrediente);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


postRouter.post('/courses', (req, res) => {
  let aux: [Ingrediente, number][] = [];
  
  req.body.ingredientes.forEach((ingrediente: [IngredienteJSON, number]) => {
    let auxIngrediente = new Ingrediente(ingrediente[0].nombre, ingrediente[0].grupo.numGrupo, [ingrediente[0].composicionNutricional.lipidos, ingrediente[0].composicionNutricional.hCarbono, ingrediente[0].composicionNutricional.proteinas, ingrediente[0].composicionNutricional.kCal], [ingrediente[0].localizacion.ciudad, ingrediente[0].localizacion.pais], ingrediente[0].precio);
    aux.push([auxIngrediente, ingrediente[1]]);
  });
  const plato = new Platos(req.body.nombre, aux, req.body.categoria);
  const platoAIntroducir = new platoSchema(plato);

  platoAIntroducir.save().then((plato) => {
    res.status(201).send(plato);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


postRouter.post('/menus', (req, res) => {

  const menu = new menuSchema(req.body);

  menu.save().then((menu) => {
    res.status(201).send(menu);
  }).catch((error) => {
    res.status(400).send(error);
  });
});