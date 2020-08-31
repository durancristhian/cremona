# cremona

Esta es una aplicación que estoy desarrollando en vivo en [Twitch](https://www.twitch.tv/durancristhian).

Consiste en una pequeña app hecha con [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/) y [Firebase](https://firebase.google.com/) para generar desafíos a manera de multiple choice con un leaderboard autocalculado al final de la partida.

> _Disclaimer: La app pertenece a un caso de uso personal y es un clon de una ya existente._

## ¿Dónde puedo ver los episodios pasados?

En esta [lista de reproducción](https://www.youtube.com/playlist?list=PL83h8sf8uOkwOUa-cYh8XK-086gQf0Fy-) en Youtube.

## Episodio 1, Sábado 22/08/2020

> URL: /

- Maquetamos el `<Layout />`
- Agregamos autenticación de firebase con email y password
- [Commit con lo que hicimos en el episodio](https://github.com/durancristhian/cremona/commit/449769031786660e3631e9476da400ac5d1fb159)
- [Deploy](https://cremona-chihl7k7x.vercel.app/)

## Episodio 2, Martes 25/08/2020

> URL: /

- Se crean desafíos (mega hardcodeados) por medio de un botón en la página principal
- Se listan los desafíos de la persona y por medio de links se navega a la página de detalle que está vacía por el momento.
- [Commit con lo que hicimos en el episodio](https://github.com/durancristhian/cremona/commit/46acf428944cfc1bb1ce27b365d875d2d1e523d2)
- [Fix (Gracias Teban)](https://github.com/durancristhian/cremona/commit/59af753515d55b5818fa8bfb3ea87cce9534ca6c)
- [Deploy](https://cremona-ehj6bcue2.vercel.app/)

## Episodio 3, Sábado 29/08/2020

> URL: /games/:gameId

- Maquetamos una card muy sencilla para mostrar algo de información relevante del desafío
- Dibujamos un componente por cada estado del desafío (creado, jugando, terminado)
- Cambiamos el método de autenticación en el juego. De ahora en más usaremos Google
- Permitimos que cada persona logueada pueda "jugar" presionando un botón y obteniendo un score aleatorio
- Se muestra una tabla de posiciones con los resultados
- [Commit con lo que hicimos en el episodio - Parte 1](https://github.com/durancristhian/cremona/commit/6775dce64e404d6d0d1b9e394ada6f9e60f518eb)
- [Commit con lo que hicimos en el episodio - Parte 2](https://github.com/durancristhian/cremona/commit/fd7eaee00f303f2a8fe81920e0ac654ea226b1f9)
- [Deploy](https://cremona-f6g71y7pa.vercel.app/)


## Desarrollo

Duplicar el archivo `.env.template`, renombrarlo como `.env.` y agregar los valores para poder correr el proyecto. Luego:

```bash
# Instalar dependencias
npm i

# Correr la aplicación
npm run dev
```
