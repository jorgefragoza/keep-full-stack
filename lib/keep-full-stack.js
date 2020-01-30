const End = require('./end')

class KeepFullStack {
    constructor() {
        let currentThreads = 0;
        let totalThreads = 0;
        let finishedThreads = 0;
        let subscribed = false;

        let EventHandler = (() => {
            let topics = {};
            let hOP = topics.hasOwnProperty;
            return {
                sub: (topic, listener) => {
                    if(!hOP.call(topics, topic.name)) topics[topic.name] = [];
                    let item = topics[topic.name].push(listener)-1;
                    return {
                        remove: () => {
                            delete topics[topic.name][item];
                        }
                    };
                },
                pub: (topic) => {
                    if(!hOP.call(topics, topic.__proto__.constructor.name)) return;
                    topics[topic.__proto__.constructor.name].forEach((item) => {
                        item(...Object.values(topic));
                    });
                }
            };
        })();

        /**
        * Muestra un mensaje de texto
        * @param {Int} totals Número total de iteraciones
        * @param {Int} threads Número de hilos concurrentes
        * @param {function} callback Callback de ejecución
        * @returns {Promise} Retorna una promesa resuelta cuando concluye el total de iteraciones
        */
        this.run = async function keepFullStack(totals, threads, callback) {
            return new Promise(async (rs,rj)=>{
                try {
                    if (!subscribed) {
                        EventHandler.sub(End, () => {
                            rs(true)
                        })
                        subscribed=true
                    }
                    if (totals === 0) {
                        EventHandler.pub(new End())
                        return
                    }
                    currentThreads++
                    totalThreads++
                    if (totalThreads < totals && currentThreads < threads)
                        keepFullStack(totals, threads, callback)
                    await callback()
                }
                catch (error) {
                    rj(error)
                }
                finally {
                    currentThreads--
                    finishedThreads++
                    if (finishedThreads === totals) {
                        EventHandler.pub(new End())
                        return
                    }
                    if (totalThreads < totals)
                        keepFullStack(totals, threads, callback)
                }
            })
        }
    }
}

module.exports = KeepFullStack;