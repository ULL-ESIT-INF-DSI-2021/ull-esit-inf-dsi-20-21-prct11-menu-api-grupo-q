import * as express from 'express';
import {ingredientSchema} from "../models/Ingredients/IngredientSchema";
import * as fs from 'fs';
const path = require('path')

export const getRouter = express.Router();

getRouter.get('/ingredientes', (req, res) => {

    const filter = req.query.nameIngredient?{nombre: req.query.nameIngredient.toString()}:{};
    ingredientSchema.findOne(filter).then((ingredient) => {
      console.log(ingredient?.getNombre());
      console.log(filter);
      if (ingredient == null) {
        res.status(401).send();
      } 
      else {
          console.log("EL ingrediente es: ", ingredient)
          res.send(ingredient);
      }
    }).catch(() => {
      res.status(400).send();
    });
});
