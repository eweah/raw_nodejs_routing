'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module DotEnv
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc ENV class
 */


const dotenv = require('../.env')
class DotEnv extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })
        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(DotEnv)
            // auto invoke methods
        this.autoinvoker(DotEnv)
            // add other classes method if methods do not already exists. Argument order matters!
            // this.methodizer(Model)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)
    }

    init() {
        for (let key in dotenv()) {
            if (!process.env[key]) {
                process.env[key] = dotenv()[key]
            }
        }
    }



    /**
     * @name autoinvoked
     * @function
     *
     * @param {Object|Function|Class} className the class whose methods to be bound to it
     * 
     * @description auto sets the list of methods to be auto invoked
     * 
     * @return does not return anything
     * 
     */

    autoinvoked() {
        return ['init']
    }

}

module.exports = new DotEnv