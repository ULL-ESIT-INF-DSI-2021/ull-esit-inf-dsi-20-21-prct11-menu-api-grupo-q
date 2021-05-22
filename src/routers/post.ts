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

  console.log("Peticion: ", req.body.ingredientes)
  
  req.body.ingredientes.forEach((ingrediente: [IngredienteJSON, number]) => {
    console.log(ingrediente);
    const filter = {"nombre": ingrediente[0].nombre};
    console.log("El filter es: ", filter);
    ingredientSchema.findOne(filter).then((ingredient) => {
      console.log("El ingrediente es: ", ingredient);
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
        let numCarbono = parseFloat(cadena.substring(cadena.indexOf('hCarbono:')+10, cadena.indexOf(', proteinas')));
        let numProteinas = parseFloat(cadena.substring(cadena.indexOf('proteinas:')+11, cadena.indexOf(', kCal')));
        let numKCal = parseFloat(cadena.substring(cadena.indexOf('kCal:')+6, cadena.indexOf('kCal:')+8));
        let nombreCiudad = cadena.substring(cadena.indexOf('ciudad:')+9, cadena.indexOf('pais')-3);
        let nombrePais = cadena.substring(cadena.indexOf('pais:')+7, cadena.indexOf('pais:')+13); //revisar salida
        let numPrecio = parseFloat(cadena.substring(cadena.indexOf('precio:')+8));
        console.log(nombreIngrediente);
        console.log(numGrupoAlimenticio);
        console.log(numLipidos);
        console.log(numCarbono);
        console.log(numProteinas);
        console.log(numKCal);
        console.log(nombreCiudad);
        console.log(nombrePais);
        console.log(numPrecio);
        let auxIngrediente = new Ingrediente(nombreIngrediente, numGrupoAlimenticio, [numLipidos, numCarbono, numProteinas, numKCal], [nombreCiudad, nombrePais], numPrecio);
        console.log("Metemos ingredientes ", [auxIngrediente, ingrediente[1]]);
        aux.push([auxIngrediente, ingrediente[1]]);
      }
    }).catch(() => {
      res.status(400).send();
    });
  });

  //console.log("El conjunto de ingredientes a introducir es: ", aux)

  const plato = new Platos(req.body.nombre, aux, req.body.categoria);
  const platoAIntroducir = new platoSchema(plato);

  platoAIntroducir.save().then((plato) => {
    res.status(201).send(plato);
  }).catch((error) => {
    res.status(400).send(error);
  });
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