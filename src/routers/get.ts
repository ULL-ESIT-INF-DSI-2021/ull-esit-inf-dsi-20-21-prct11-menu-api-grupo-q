import * as express from 'express';
import {ingredientSchema} from "../models/Ingredientes/IngredientSchema";
import { platoSchema } from '../models/Platos/platoSchema';
import { menuSchema } from '../models/Menu/menuSchema';
import * as fs from 'fs';
const path = require('path')


export const getRouter = express.Router();


getRouter.get('/ingredients', (req, res) => {

    const filter = req.query.nameIngredient?{nombre: req.query.nameIngredient.toString()}:{};

    ingredientSchema.findOne(filter).then((ingredient) => {
      if (ingredient == null) {
        res.status(401).send();
      } 
      else {
          res.send(ingredient);
      }
    }).catch(() => {
      res.status(400).send();
    });
});


getRouter.get('/courses', (req, res) => {

  const filter = req.query.nameCourse?{nombre: req.query.nameCourse.toString()}:{};
  console.log(filter)
  platoSchema.findOne(filter).then((plato) => {
    if (plato == null) {
      res.status(401).send();
    } 
    else {
      res.send(plato);
    }
  }).catch(() => {
    res.status(400).send();
  });
});


getRouter.get('/menus', (req, res) => {

  const filter = req.query.nameMenu?{nameMenu: req.query.nameMenu.toString()}:{};

  menuSchema.findOne(filter).then((menu) => {
    if (menu == null) {
      res.status(401).send();
    } 
    else {
        res.send(menu);
    }
  }).catch(() => {
    res.status(400).send();
  });
});