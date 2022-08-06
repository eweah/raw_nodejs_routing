'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.dev
 *     github: https://github.com/ericsonsweah
 * 
 * @module Sample
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Sample class
 */


class Sample extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Sample)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }


}

module.exports = Sample