import * as express from 'express';
import {ingredientSchema} from '../models/Ingredients/IngredientSchema';
export const deleteRouter = express.Router();

deleteRouter.delete('/ingredientes', (req, res) => {
  if (!req.query.nameIngredient) {
    res.status(400).send({
      error: 'A ingredient name must be provided',
    });
  } else {
    ingredientSchema.findOneAndDelete({nombre: req.query.nameIngredient.toString()}).then((ingrediente) => {
      console.log(`${req.query.nameIngredient?.toString()}`);
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