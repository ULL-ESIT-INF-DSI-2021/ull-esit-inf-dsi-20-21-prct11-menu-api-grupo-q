import * as express from 'express';
import {ingredientSchema} from '../models/Ingredients/IngredientSchema';
import {platoSchema} from '../models/Courses/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';


export const postRouter = express.Router();


postRouter.post('/ingredientes', (req, res) => {

  const ingrediente = new ingredientSchema(req.body);

  ingrediente.save().then((ingrediente) => {
    res.status(201).send(ingrediente);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


postRouter.post('/courses', (req, res) => {

  const plato = new platoSchema(req.body);

  plato.save().then((plato) => {
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