import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import {platoSchema} from '../models/Platos/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';


export const patchRouter = express.Router();


patchRouter.patch('/ingredients', (req, res) => {
  if (!req.query.nameIngredient) {
    res.status(400).send({
      error: 'Un nombre de ingrediente debe ser añadido'
    });
  } else {
    const allowedUpdates = ['nombre', 'grupo', 'composicionNutricional', 'localizacion', 'precio'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(405).send({
        error: 'El método update no ha sido validado'
      });
    } else {
      ingredientSchema.findOneAndUpdate({nombre: req.query.nameIngredient.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((ingrediente) => {
        if (!ingrediente) {
          res.status(404).send({
            error: 'No se encuentra el nombre del ingrediente'
          });
        } else {
          res.status(202).send(ingrediente);
        }
      }).catch(() => {
        res.status(400).send({
          error: 'Solicitud Incorrecta'
        });
      });
    }
  }
});


patchRouter.patch('/courses', (req, res) => {
  if (!req.query.nameCourse) {
    res.status(400).send({
      error: 'Un nombre de plato debe ser añadido'
    });
  } else {
    const allowedUpdates = ['nombre', 'ingredientes', 'categoria'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(405).send({
        error: 'El método update no ha sido validado'
      });
    } else {
      platoSchema.findOneAndUpdate({nombre: req.query.nameCourse.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((plato) => {
        if (!plato) {
          res.status(404).send({
            error: 'No se encuentra el nombre del plato'
          });
        } else {
          res.status(202).send(plato);
        }
      }).catch(() => {
        res.status(400).send({
          error: 'Solicitud Incorrecta'
        });
      });
    }
  }
});

patchRouter.patch('/menus', (req, res) => {
  if (!req.query.nameMenu) {
    res.status(400).send({
      error: 'Un nombre de menu debe ser añadido'
    });
  } else {
    const allowedUpdates = ['nombre', 'platos'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate =
      actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      res.status(405).send({
        error: 'El método update no ha sido validado'
      });
    } else {
      menuSchema.findOneAndUpdate({nombre: req.query.nameMenu.toString()}, req.body, {
        new: true,
        runValidators: true,
      }).then((menu) => {
        console.log("Hola")
        console.log(menu)
        if (!menu) {
          res.status(404).send({
            error: 'No se encuentra el nombre del menu'
          });
        } else {
          res.status(202).send(menu);
        }
      }).catch(() => {
        res.status(400).send({
          error: 'Solicitud Incorrecta'
        });
      });
    }
  }
});