# Práctica 11 - API Node/Express de gestión de información nutricional
## Desarrollo de Sistemas Informáticos - _Grupo q_

### Introducción

En este informe se resumen las actividades realizadas en la **práctica 11** para poner en práctica nuestros conocimientos de API Node/Exprees. Será la segunda práctica grupal y deberemos usar todas las herramientas aprendidas con anterioridad, además utilizaremos Mongodb y se deberá desplegar la API en Heroku.

### Objetivos

Al finalizar la práctica, habremos completado los siguientes objetivos:

* Manejar con destresa un servidor we a través de node/express 
* Llevar a cabo en la API, las operaciones de creación, lectura, modificación y borrado de ingredientes, platos y menus.
* Dominar el correcto uso conjunto de todas las distintas estructuras y tipos de datos
* Aprender a usar el módulo MongoDb para la gestión de una base de datos 

### 1. Creación y configuración del driectorio del proyecto.

#### 1.1. Estructura inicial

Para la creación de la estructura inicial, utilizaremos el mismo diseño que hemos implementado en practicas anteriores (por ejemplo, [práctica 4](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct04-arrays-tuples-enums-alu0101203003/blob/gh-pages/index.md)).

La estructura debería quedar similar a las siguientes fotos:

<img src="img/Captura1a.PNG" alt="" height="250"/> <img src="img/Captura1b.PNG" alt="" /> <img src="img/Captura1c.PNG" alt="" />

#### 1.2. Organización de los ejercicios

Será necesario implementar las clases del ejercicio en ficheros diferentes. Los ficheros que dependan de otros requeriran de un `import` del fichero que necesiten:

<img src="img/Captura1dd.PNG" alt="" /> <img src="img/Captura1ee.PNG" alt="" />

Se creará una subcarpeta para cada apartado del ejercicio en la carpeta src y, su correspondiente espectativa se crearán en la carpeta test con un fichero para realizar las pruebas de cada apartado.

### 2. Ejercicio

Se pasa a explicar la resolución del ejercicio y a adjuntar su código. Se mostrará una versión simplificada del enunciados del ejercicio (para verlo al completo con aclaraciones y pistas, consultar la [guía de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct11-menu-api/).

#### 2.1 Alimentos y/o ingredientes

**Enunciado:**

Para cada alimento o ingrediente se deberá poder crear, leer, actualizar o borrar un ingrediente a través de los métodos HTTP necesarios, donde cada ingrediente considerado dentro del sistema de menus se debe almacenar la información siguiente:

1. Grupo de alimentos al que pertenece que puede ser:
  * Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.
  * Verduras y hortalizas.
  * Leche y derivados.
  * Cereales.
  * Frutas.
2. La composición nutricional del alimento con respecto a los macronutrientes y kcal por 100 gr de dicho alimento.
  * Macronutrientes: Hidratos de carbono, proteínas y lípidos.
3. Precio del alimento y/o ingrediente por kg en euros.

Además, un alimento tendrá un nombre y localización de origen: país y ciudad.


**Resolución:**

#### 2.2.Platos

**Enunciado:**

Al igual que con los ingredientes, se deberá poder crear, leer, actualizar o borrar un plato a través de los métodos HTTP necesarios.

Los platos de un menú estarán compuestos por alimentos y/o ingredientes como los definidos anteriormente. Además, deberá considerar que un plato puede pertener a cuatro categorías distintas: entrante, primer plato, segundo plato y postre. Asimismo, para cada plato dentro del sistema se debería poder acceder a la siguiente información:

1. Lista de alimentos y/o ingredientes que lo componen.
2. Composición nutricional del plato. Esto es, la suma de la composición nutricional de los alimentos que componen el plato. Hay que tener en cuenta que los valores nutricionales se definen por 100 gr de ingrediente, pero no siempre se usan 100 gr de cada ingrediente para elaborar un plato.
3. Grupo de alimento predominante. Este atributo deberá definir el grupo de alimento que más aparece entre los ingredientes del plato (véase la lista de en el apartado Alimentos).
4. Precio total del plato en euros en función de la suma de los precios de los ingredientes y sus cantidades que lo componen.

**Resolución:**

#### 2.3.Menús

**Enunciado:**

En la ruta /menus del API, se deberá poder crear, leer, actualizar o borrar un menú a través de los métodos HTTP necesarios.

Un menú estará compuesto por platos, incluyendo un plato de cada categoría o, al menos, tres de ellas. Para cada menú, se debe poder consultar la siguiente información:

1. Precio total del menú en euros.
2. Platos que lo componen con sus correspodientes alimentos y/o ingredientes.
3. Composición nutricional del menú de acuerdo a lo definido en el punto 2 de la sección Alimentos.
4. Listado de grupos de alimentos por orden de aparición.

**Resolución:**
