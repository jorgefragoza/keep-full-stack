declare module 'keep-full-stack' {
    export = class {
        constructor() {}
        /**
        * Muestra un mensaje de texto
        * @param {Int} totals Número total de iteraciones
        * @param {Int} threads Número de hilos concurrentes
        * @param {function} callback Callback de ejecución
        * @returns {Promise} Retorna una promesa resuelta cuando concluye el total de iteraciones
        */
       public run(totals: number, threads: number, callback: any): void;
    }
}