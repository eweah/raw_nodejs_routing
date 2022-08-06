'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module UsersController
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc UsersController class
 */


class UsersController extends require('../Controller') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(UsersController)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }
    async index(req, res) {}
    async store(req, res) {}
    async edit(req, res) {}
    async show(req, res) {}
    async update(req, res) {}
    async destroy(req, res) {}

}
module.exports = UsersController