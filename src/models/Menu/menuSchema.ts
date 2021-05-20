import {Menu} from "../Menu/menus";
import {Document, Schema, model} from 'mongoose';

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
  platos: { // REVISAR EL SCHEMA PARA PONER LOS PLATOS
    type: Array,
    ingrediente: {
      type: JSON,
      required: true,
      unique: true,
      trim: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('El nombre del Plato debe empezar con mayuscula');
        }
      },
    },
    cantidad: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del menu debe ser un numero positivo');
      }
    },
  },
});

export const menuSchema = model<Menu>('Menu', MenuSchema);
