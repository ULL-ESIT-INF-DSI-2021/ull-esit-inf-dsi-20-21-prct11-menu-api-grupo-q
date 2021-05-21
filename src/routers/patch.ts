import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import {platoSchema} from '../models/Platos/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';


export const patchRouter = express.Router();


patchRouter.patch('/ingredients', (req, res) => {
  if (!req.query.nameIngredient) {
    res.status(400).send({
      error: 'A name must be provided',
    });
  } else {
    const allowedUpdates = ['nombre', 'grupo', 'composicionNutricional', 'localizacion', 'precio'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      ingredientSchema.findOneAndUpdate({nombre: req.query.nameIngredient.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((ingrediente) => {
        if (!ingrediente) {
          res.status(404).send();
        } else {
          res.send(ingrediente);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});


patchRouter.patch('/courses', (req, res) => {
  if (!req.query.nameCourse) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    const allowedUpdates = ['nombre', 'ingredientes', 'categoria'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      platoSchema.findOneAndUpdate({nombre: req.query.nameCourse.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((plato) => {
        if (!plato) {
          res.status(404).send();
        } else {
          res.send(plato);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});

patchRouter.patch('/menus', (req, res) => {
  if (!req.query.nombre) {
    res.status(400).send({
      error: 'A title must be provided',
    });
  } else {
    const allowedUpdates = ['nombre', 'platos', 'precio', 'composicionNutricional'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(400).send({
        error: 'Update is not permitted',
      });
    } else {
      menuSchema.findOneAndUpdate({nombre: req.query.nombre.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((menu) => {
        if (!menu) {
          res.status(404).send();
        } else {
          res.send(menu);
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
    }
  }
});