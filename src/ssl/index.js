'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module SSL
 * @kind class
 * 
 * @extends Base
 * @requires Base
 * 
 * @classdesc SSL class
 */


const path = require('path')

class SSL extends require('../Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(SSL)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }
    static cert() {
        return path.join(__dirname, './cert.pem')
    }
    static key() {
        return path.join(__dirname, './key.pem')
    }
    certs() {
        return path.join(__dirname, './cert.pem')
    }
    keys() {
        return path.join(__dirname, './key.pem')
    }

}

module.exports = SSL
