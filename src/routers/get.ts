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
        res.status(406).send({
          error: 'No se acepta que un ingrediente sea nulo o esté vacío'
        });
      } 
      else {
          res.status(200).send(ingredient);
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
});


getRouter.get('/courses', (req, res) => {

  const filter = req.query.nameCourse?{nombre: req.query.nameCourse.toString()}:{};
  console.log(filter)
  platoSchema.findOne(filter).then((plato) => {
    if (plato == null) {
      res.status(406).send({
        error: 'No se acepta que un plato sea nulo o esté vacío'
      });
    } 
    else {
      res.status(200).send(plato);
    }
  }).catch(() => {
    res.status(400).send({
      error: 'Solicitud Incorrecta'
    });
  });
});


getRouter.get('/menus', (req, res) => {

  const filter = req.query.nameMenu?{nombre: req.query.nameMenu.toString()}:{};

  menuSchema.findOne(filter).then((menu) => {
    if (menu == null) {
      res.status(406).send({
        error: 'No se acepta que un menu sea nulo o esté vacío'
      });
    } 
    else {
        res.status(200).send(menu);
    }
  }).catch(() => {
    res.status(400).send({
      error: 'Solicitud Incorrecta'
    });
  });
});