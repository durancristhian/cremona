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

## Desarrollo

Duplicar el archivo `.env.template`, renombrarlo como `.env.` y agregar los valores para poder correr el proyecto. Luego:

```bash
# Instalar dependencias
npm i

# Correr la aplicación
npm run dev
```
