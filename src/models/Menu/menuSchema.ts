import {Menu} from "../Menu/menus";
import {Document, Schema, model} from 'mongoose';
import { PlatoSchema } from '../Platos/platoSchema';


const MenuSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del Plato debe empezar con mayuscula');
      }
    },
  },
  platos: {
    type: [PlatoSchema],
    required: true,
  },
  precio: {
    type: Number,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del menu debe ser un numero positivo');
      }
    },
  },
  composicionNutricional: {
    lipidos: {
      type: Number,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de lipidos debe ser un numero positivo');
        }
      },
    },
    hCarbono: {
      type: Number,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de hidratos de carbono debe ser un numero positivo');
        }
      },
    },
    proteinas: {
      type: Number,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de proteinas debe ser un numero positivo');
        }
      },
    },
    kCal: {
      type: Number,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de kilocalorias debe ser un numero positivo');
        }
      },
    },
  },
});

export const menuSchema = model<Menu>('menus', MenuSchema);
