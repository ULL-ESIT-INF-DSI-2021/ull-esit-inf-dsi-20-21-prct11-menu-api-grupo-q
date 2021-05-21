import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import { platoSchema } from '../models/Platos/platoSchema';


export const deleteRouter = express.Router();


deleteRouter.delete('/ingredients', (req, res) => {
  if (!req.query.nameIngredient) {
    res.status(400).send({
      error: 'A ingredient name must be provided',
    });
  } else {
    ingredientSchema.findOneAndDelete({nombre: req.query.nameIngredient.toString()}).then((ingrediente) => {
      if (!ingrediente) {
        res.status(404).send();
      } else {
        res.send(ingrediente);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});


deleteRouter.delete('/courses', (req, res) => {
  if (!req.query.nameCourse) {
    res.status(400).send({
      error: 'A ingredient name must be provided',
    });
  } else {
    platoSchema.findOneAndDelete({nombre: req.query.nameCourse.toString()}).then((plato) => {
      if (!plato) {
        res.status(404).send();
      } else {
        res.send(plato);
      }
    }).catch(() => {
      res.status(400).send();
    });
  }
});