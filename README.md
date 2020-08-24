# cremona

Esta es una aplicación que estoy desarrollando en vivo en [Twitch](https://www.twitch.tv/durancristhian).

Consiste en una pequeña app hecha con [Next.js](https://nextjs.org/), [Tailwind](https://tailwindcss.com/), [TypeScript](https://www.typescriptlang.org/) y [Firebase](https://firebase.google.com/) para generar desafíos a manera de multiple choice con un leaderboard autocalculado al final de la partida.

> _Disclaimer: La app pertenece a un caso de uso personal y es un clon de una ya existente._

## ¿Dónde puedo ver los episodios pasados?

En esta [lista de reproducción](https://www.youtube.com/playlist?list=PL83h8sf8uOkwOUa-cYh8XK-086gQf0Fy-) en Youtube.

## Episodio 1, Sábado 22/08/2020

- Maquetamos el `<Layout />` y agregamos autenticación de firebase con email y password
- [Commit con lo que hicimos en el episodio](https://github.com/durancristhian/cremona/commit/449769031786660e3631e9476da400ac5d1fb159)
- [Deploy](https://cremona-chihl7k7x.vercel.app/)

## Desarrollo

Duplicar el archivo `.env.template`, renombrarlo como `.env.` y agregar los valores para poder correr el proyecto. Luego:

```bash
# Instalar dependencias
npm i

# Correr la aplicación
npm run dev
```
