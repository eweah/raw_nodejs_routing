'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module Router
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Router class
 */


class Router extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Router)

        this.setMaxListeners(Infinity)
    }

    // Available default HTTP methods for mounting to Router
    methodList() {
        return ['get', 'post', 'put', 'delete', 'patch']
    }

    // Mounting HTTP Method To Router : GET Method
    get(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.get(path, fn)
    }

    // Mounting HTTP Method To Router : POST Method
    post(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.post(path, fn)
    }
    // Mounting HTTP Method To Router : PUT Method
    put(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.put(path, fn)
    }
    // Mounting HTTP Method To Router : DELETE Method
    delete(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.delete(path, fn)
    }
    // Mounting HTTP Method To Router : PATCH Method
    patch(path, fn = () => {}) {
        let router = {}
        return router[path] = this.app.patch(path, fn)
    }

}

module.exports = Router