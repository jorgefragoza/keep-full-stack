# keep-full-stack
Utileria para ejecutar de manera sincrona hilos de un mismo proceso

## Instalaación
Utilize NPM [Node Package Manager] https://www.npmjs.com/get-npm para instalar keep-full-stack.

```bash
npm install git+https://github.com/jorgefragoza/keep-full-stack.git
```

## Implemenación

```NodeJS
const KeepFullStack = require('keep-full-stack');

let iterator = new KeepFullStack();

(async () => {
    await iterator.run({TOTAL_ITERACIONES:number}, {HILOS_CONCURRENTES:number}, async () => {
        //
        // proceso asíncrono
        //
    }
})()
```

## Contributing
Pull request son bienvenidos. Para cambios importantes, por favor abra primero un issue para analizar qué le gustaría cambiar.

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)