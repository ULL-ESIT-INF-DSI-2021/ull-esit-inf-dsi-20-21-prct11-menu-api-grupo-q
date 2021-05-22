import * as express from 'express';
import {ingredientSchema} from '../models/Ingredientes/IngredientSchema';
import {platoSchema} from '../models/Platos/platoSchema';
import {menuSchema} from '../models/Menu/menuSchema';
import { Platos } from '../models/Platos/platos';
import { Menu } from '../models/Menu/menus';
import { Ingrediente } from '../models/Ingredientes/ingredientes';
import { IngredienteJSON } from '../models/Ingredientes/tiposDefinidos';
import { PlatoJSON } from '../models/Platos/tiposDefinidos';
import { send } from 'process';


export const postRouter = express.Router();


postRouter.post('/ingredients', (req, res) => {
  const ingrediente = new ingredientSchema(req.body);

  ingrediente.save().then((ingrediente) => {
    res.status(201).send(ingrediente);
  }).catch((error) => {
    res.status(400).send(error);
  });
});


postRouter.post('/courses', (req, res) => {

  let aux: [Ingrediente, number][] = [];
  
  req.body.ingredientes.forEach((ingrediente: [IngredienteJSON, number]) => {
    //console.log(ingrediente);
    const filter = {nombre: ingrediente[0].nombre};
    ingredientSchema.findOne(filter).then((ingredient) => {
      console.log(ingredient);
      if (ingredient == null) {
        res.status(401).send({
          error: 'El ingrediente no se encuentra en la base de datos',
        });
      } 
      else {
        let cadena = ingredient.toString();
        let nombreIngrediente = cadena.substring(cadena.indexOf('nombre:')+9, cadena.indexOf('precio:')-5);
        let numGrupoAlimenticio = parseInt(cadena.substring(cadena.indexOf('numGrupo:')+10, cadena.indexOf('numGrupo:')+12));
        let numLipidos = parseFloat(cadena.substring(cadena.indexOf('lipidos:')+9, cadena.indexOf(', hCarbono')));
        console.log(nombreIngrediente);
        console.log(numGrupoAlimenticio);
        console.log(numLipidos);
        //let auxIngrediente = new Ingrediente(nombreIngrediente, numGrupoAlimenticio, [numLipidos, numHCarbono, ingredient.getComposicionNutricional().proteinas, ingredient.getComposicionNutricional().kCal], [ingredient.getLocalizacion().ciudad, ingredient.getLocalizacion().pais], ingredient.getPrecio());
        //console.log(auxIngrediente);
        //aux.push([auxIngrediente, ingrediente[1]]);
      }
    }).catch(() => {
      res.status(400).send();
    });
  });

  /*const plato = new Platos(req.body.nombre, aux, req.body.categoria);
  const platoAIntroducir = new platoSchema(plato);

  platoAIntroducir.save().then((plato) => {
    res.status(201).send(plato);
  }).catch((error) => {
    res.status(400).send(error);
  });*/
});


postRouter.post('/menus', (req, res) => {

  let auxVecPlatos: Platos[] = [];

  req.body.platos.forEach((platoJS: PlatoJSON) => {
    let auxVecIngredientes: [Ingrediente, number][] = [];
    platoJS.ingredientes.forEach((ingrediente: [IngredienteJSON, number]) => {
      let auxIngrediente = new Ingrediente(ingrediente[0].nombre, ingrediente[0].grupo.numGrupo, [ingrediente[0].composicionNutricional.lipidos, ingrediente[0].composicionNutricional.hCarbono, ingrediente[0].composicionNutricional.proteinas, ingrediente[0].composicionNutricional.kCal], [ingrediente[0].localizacion.ciudad, ingrediente[0].localizacion.pais], ingrediente[0].precio);
      auxVecIngredientes.push([auxIngrediente, ingrediente[1]]);
      console.log(auxVecIngredientes);
    });
    console.log(auxVecPlatos);

    const plato = new Platos(platoJS.nombre, auxVecIngredientes, platoJS.categoria);
    auxVecPlatos.push(plato)
  });

  const menu = new Menu(req.body.nombre, auxVecPlatos);
  const menuAIntroducir = new menuSchema(menu);

  menuAIntroducir.save().then((menu) => {
    res.status(201).send(menu);
  }).catch((error) => {
    res.status(400).send(error);
  });
});