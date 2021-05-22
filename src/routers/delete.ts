import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import { menuSchema } from '../models/Menu/menuSchema';
import { platoSchema } from '../models/Platos/platoSchema';


export const deleteRouter = express.Router();


deleteRouter.delete('/ingredients', (req, res) => {
  if (!req.query.nameIngredient) {
    res.status(400).send({
      error: 'Un nombre de ingrediente debe ser añadido'
    });
  } else {
    ingredientSchema.findOneAndDelete({nombre: req.query.nameIngredient.toString()}).then((ingrediente) => {
      if (!ingrediente) {
        res.status(404).send({
          error: 'No se encuentra el nombre del ingrediente'
        });
      } else {
        res.status(200).send(ingrediente);
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
  }
});


deleteRouter.delete('/courses', (req, res) => {
  if (!req.query.nameCourse) {
    res.status(400).send({
      error: 'Un nombre de plato debe ser añadido'
    });
  } else {
    platoSchema.findOneAndDelete({nombre: req.query.nameCourse.toString()}).then((plato) => {
      if (!plato) {
        res.status(404).send({
          error: 'No se encuentra el nombre del plato'
        });
      } else {
        res.status(200).send(plato);
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
  }
});


deleteRouter.delete('//menus', (req, res) => {
  if (!req.query.nameMenu) {
    res.status(400).send({
      error: 'Un nombre de menu debe ser añadido'
    });
  } else {
    menuSchema.findOneAndDelete({nombre: req.query.nameMenu.toString()}).then((menu) => {
      if (!menu) {
        res.status(404).send({
          error: 'No se encuentra el nombre del menu'
        });
      } else {
        res.status(200).send(menu);
      }
    }).catch(() => {
      res.status(400).send({
        error: 'Solicitud Incorrecta'
      });
    });
  }
});