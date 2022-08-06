'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module Controller
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Controller class
 */



class Controller extends require('../../src/Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Controller)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)
    }
    async index(req, res) {}
    async create(req, res) {}
    async show(req, res) {}
    async edit(req, res) {}
    async update(req, res) {}
    async destroy(req, res) {}
}

module.exports = Controller