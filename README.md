# cremona

Esta es una aplicación que estoy desarrollando en vivo en [Twitch](https://www.twitch.tv/durancristhian).

Consiste en una pequeña app hecha con [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/) y [Firebase](https://firebase.google.com/) para generar desafíos a manera de multiple choice con un leaderboard autocalculado al final de la partida.

> _Disclaimer: La app pertenece a un caso de uso personal y es un clon de una ya existente._

## Episodio 1, Sábado 22/08/2020

- Maquetamos el `<Layout />`
- Agregamos autenticación de firebase con email y password
- Commits:
    - [Episodio #1](https://github.com/durancristhian/cremona/commit/449769031786660e3631e9476da400ac5d1fb159)
- [Deploy](https://cremona-chihl7k7x.vercel.app/)

[![Episodio 1](https://img.youtube.com/vi/UVh9CScWLnQ/0.jpg)](https://www.youtube.com/watch?v=UVh9CScWLnQ)

## Episodio 2, Martes 25/08/2020

- Se crean desafíos (mega hardcodeados) por medio de un botón en la página principal
- Se listan los desafíos de la persona y por medio de links se navega a la página de detalle que está vacía por el momento.
- Commits:
    - [Episodio #2](https://github.com/durancristhian/cremona/commit/46acf428944cfc1bb1ce27b365d875d2d1e523d2)
    - [Fix (Gracias Teban)](https://github.com/durancristhian/cremona/commit/59af753515d55b5818fa8bfb3ea87cce9534ca6c)
- [Deploy](https://cremona-ehj6bcue2.vercel.app/)

[![Episodio 2](https://img.youtube.com/vi/-M_JguJlHC4/0.jpg)](https://www.youtube.com/watch?v=-M_JguJlHC4)

## Episodio 3, Sábado 29/08/2020

- Maquetamos una card muy sencilla para mostrar algo de información relevante del desafío
- Dibujamos un componente por cada estado del desafío (creado, jugando, terminado)
- Cambiamos el método de autenticación en el juego. De ahora en más usaremos Google
- Permitimos que cada persona logueada pueda "jugar" presionando un botón y obteniendo un score aleatorio
- Se muestra una tabla de posiciones con los resultados
- Commits:
    - [Episodio #3 - Parte 1](https://github.com/durancristhian/cremona/commit/6775dce64e404d6d0d1b9e394ada6f9e60f518eb)
    - [Episodio #3 - Parte 2](https://github.com/durancristhian/cremona/commit/fd7eaee00f303f2a8fe81920e0ac654ea226b1f9)
- [Deploy](https://cremona-f6g71y7pa.vercel.app/)

[![Episodio 3](https://img.youtube.com/vi/0zlTwUxb1ho/0.jpg)](https://www.youtube.com/watch?v=0zlTwUxb1ho)

## Episodio 4, Martes 01/09/2020

- Agregamos más preguntas a los desafíos que se crean en la página principal para que tenga más sentido
- Validamos que se pueda jugar una sola vez por email
- Se muestra el estado del juego de la persona mientras el desafío no haya terminado
- Creamos la página para jugar donde se recorre la colección de preguntas, se permite elegir, se da feedback sobre si la elección fue correcta o no y se guarda al final un puntaje en base a la cantidad de aciertos
- Commits:
    - [Episodio #4](https://github.com/durancristhian/cremona/commit/6082985efb8028fd30b5024d03e3b3bd43362c00)
- [Deploy](https://cremona-3mllbjl3g.vercel.app/)

[![Episodio 4](https://img.youtube.com/vi/YVBhqiSFPfk/0.jpg)](https://www.youtube.com/watch?v=YVBhqiSFPfk)

## Episodio 5, Sábado 05/09/2020

- Ordenamos la lista de desafíos en la página principal
- Agregamos sonidos de éxito y error al responder
- Agregamos un countdown a la pregunta que muestra el tiempo que te queda para terminar de responder. Quedó con algunos bugs pero lo mejoraremos el episodio que viene
- Agregamos 2 hooks: useAudio y useInterval que los usamos en los features anteriores
- Commits:
    - [Episodio #5](https://github.com/durancristhian/cremona/commit/88c00cbc3db92a986e7b59d7b17432b135c8f6bb)
- [Deploy](https://cremona-n43tjppfz.vercel.app/)

[![Episodio 5](https://img.youtube.com/vi/bTQ_WzkoB_o/0.jpg)](https://www.youtube.com/watch?v=bTQ_WzkoB_o)

## Episodio 6, Martes 08/09/2020

- Repensamos la cuenta regresiva que había quedado con algunos errores
- A la hora de calcular el score tenemos en cuenta el tiempo que se tardó en contestar siguiendo la fórmula que usa Kahoot!
- Mejoramos algunos detalles en forma de typos, colores y UX en general que los pasamos por alto en episodios anteriores
- Commits:
    - [Parte 1](https://github.com/durancristhian/cremona/commit/bdd7267102294644f83fef4b600ad975da7ebfb0)
    - [Parte 2](https://github.com/durancristhian/cremona/commit/da7821222ce545883da5167ed5d67a9e31680755)
    - [Hot fix](https://github.com/durancristhian/cremona/commit/e12e104f6637cbbdf12352d6977bb7c66745ccff)
    - [Fix typo](https://github.com/durancristhian/cremona/commit/4fe7f92c29d6e7e417ad5215ea285c1effa9a7d5)
- [Deploy](https://cremona-rb5psi4gz.vercel.app/)

[![Episodio 6](https://img.youtube.com/vi/yNY19ti1TXE/0.jpg)](https://www.youtube.com/watch?v=yNY19ti1TXE)

## Episodio 7, Sábado 12/09/2020

- Agregamos un contenedor en el <Layout /> de manera de evitar que el contenido se vaya hasta el borde
- Pusimos un color distinto en el fondo para aquellos challenges que no están terminados. Fue una manera de lidiar con la situación de que no tenemos filtros en esa lista
- Movimos las acciones de admin de los juegos hacia dentro de los cards. De esta manera es todo más intuitivo
- Mejoramos el copy de algunos botones y secciones
- Discutimos sobre flujos que no están del todo claros como el de la creación del objeto para la persona que va a jugar
- Mejoramos la estructura de los multiple choice. Pasamos a que las opciones se apilen, tengan un ícono que represente mejor el estado y movimos de lugar algunas partes de la UI para dar más claridad al estado actual del juego
- Mejoramos la pantalla final del juego que muestra el puntaje
- Commits:
    - [Episodio #7](https://github.com/durancristhian/cremona/commit/bf2572c0ddda2d48c91e44bc8f6c2c03752c985f)
- [Deploy](https://cremona-gd1q2tqme.vercel.app/)

[![Episodio 7](https://img.youtube.com/vi/S9Ta7HTGg1k/0.jpg)](https://www.youtube.com/watch?v=S9Ta7HTGg1k)

## Episodio 8, Martes 15/09/2020

- Mejoramos el <Layout /> agregando un select con el nombre del user y la posibilidad de hacer _sign out_ desde las opciones
- Agregamos filtro por estado (created, playing, finished) a la lista de desafíos
- Movimos la funcionalidad de crear un desafío a una nueva página
- Agregamos conteo en tiempo real de cuantas personas se anotaron a jugar, cuantas están jugando y cuantas ya terminaron
- Agregamos la posibilidad de exportar la tabla de posiciones en formato CSV para el user admin
- Commits:
    - [Episodio #8](https://github.com/durancristhian/cremona/commit/5aa5395e9e0b6f1fa644e4337bd03be09d8a8839)
- [Deploy](https://cremona-hnadc4cjl.vercel.app/)

[![Episodio 8](https://img.youtube.com/vi/3ffPagGVbqQ/0.jpg)](https://www.youtube.com/watch?v=3ffPagGVbqQ)

## Episodio 9, Sábado 18/09/2020

- Le dimos vida a la página `/create` donde empezamos a darle funcionalidad a un formulario para generar los desafíos. No lo pudimos completar, quedaron 2 pequeños features para corregir pero quedó bastante bien. Este es el stream más largo que hicimos (3 hs.) porque usamos Formik para no escribir todo tan de 0 y nos llevó algo de tiempo entender como usarlo y demás. Pero valió la pena al final :D
- Commits:
    - [Episodio #9](https://github.com/durancristhian/cremona/commit/2fdb9b653743d8b3433fce54a3c70cd823f9c918)
- [Deploy](https://cremona-6gru1w4bw.vercel.app/)

[![Episodio 9](https://img.youtube.com/vi/dCikEhJe1m0/0.jpg)](https://www.youtube.com/watch?v=dCikEhJe1m0)

## Episodio 10, Martes 22/09/2020

- Agregarmos la funcionalidad de elegir la respuesta correcta al momento de crear un desafío y también mejoramos la validación del formulario por completo
- Solucionamos el error con la descarga de los resultados del juego a un .csv
- Commits:
    - [Episodio #10](https://github.com/durancristhian/cremona/commit/f105602f1ff498cd1489358ba1ee1a05bdbaed63)
- [Deploy](https://cremona-7fimnyhdj.vercel.app/)

[![Episodio 10](https://img.youtube.com/vi/7RrRt2kvZJU/0.jpg)](https://www.youtube.com/watch?v=7RrRt2kvZJU)

## Episodio 11, Sábado 26/09/2020

- Agregamos la posibilidad de subir una foto (.jpg, .jpeg o .png) cuando se crea un desafío
- Commits:
    - [Episodio #11](https://github.com/durancristhian/cremona/commit/465991d248c40f4362758ccff33e8da1fd5868e4)
- [Deploy](https://cremona-fa7vjc7h3.vercel.app/)

[![Episodio 11](https://img.youtube.com/vi/TCen9qw3vVo/0.jpg)](https://www.youtube.com/watch?v=TCen9qw3vVo)

## Desarrollo

Duplicar el archivo `.env.template`, renombrarlo como `.env.` y agregar los valores para poder correr el proyecto. Luego:

```bash
# Instalar dependencias
npm i

# Correr la aplicación
npm run dev
```
