import * as express from 'express';
import {ingredientSchema} from "../models/Ingredients/IngredientSchema";
import * as fs from 'fs';
const path = require('path')

export const getRouter = express.Router();

getRouter.get('/ingredientes', (req, res) => {

    const filter = req.query.nombre?{nombre: req.query.nombre.toString()}:{};
    ingredientSchema.findOne(filter).then((ingredient) => {
      if (ingredient == null) {
        console.log("Hubo un error")
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
