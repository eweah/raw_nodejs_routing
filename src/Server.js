'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module Server
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Server class
 */


const http = require('http')
const https = require('https')
const { readFileSync } = require('fs')
const cpus = require('os').cpus().length
const cluster = require('cluster')

// const cli = require('../../cli/man')
const Config = require('./Config')
const SSL = require('./ssl')
const Handler = require('./Handler')

const config = new Config
const ssl = new SSL


class Server extends Handler {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })


        this.httpServer = http.createServer
        this.httpsServer = https.createServer

        // this.httpServer = http.createServer()
        // this.httpsServer = https.createServer()

        // auto bind methods
        this.autobind(Server)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }


    /**
     * @name http
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description creates and sets the http server
     * @return {Function} this.httpServer(serverHandler) the http server
     * 
     */

    http(serverHandler) {
        return this.httpServer(serverHandler)
            // return this.httpServer.on('request', serverHandler)
    }

    /**
     * @name https
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description creates and sets the https server
     * @return {Function} this.httpsServer(options, serverHandler) the https server
     * 
     */
    https(serverHandler) {
        // Instantiate the https server
        const options = {
            key: readFileSync(ssl.keys()),
            cert: readFileSync(ssl.certs()),
        }
        return this.httpsServer(options, serverHandler)
            // return this.httpsServer.on('request', (options, serverHandler))
    }

    /**
     * @name listen
     * @function
     * 
     * @param {Function} serverHandler the handler function
     * 
     * @description initiates or start the http/https server
     * @return does not return anything
     * 
     */

    listen(port = 3000, fn = () => {}) {

        let conf = config.environmentToExport()

        let options = {
            port: port || conf.httpPort,
            protocal: conf.protocal,
            hostname: conf.hostname,
            url: conf.url
        }

        if (cluster.isMaster) {

            for (let i = 0; i < cpus; i++) {
                cluster.fork()
            }
        } else {
            // Start the HTTP server 
            this.http(this.handle).listen(port, fn(options))
                // Start the HTTPS server
                //this.https(this.handler).listen(port, fn(options))
                // this.https(this.handler).listen(port, fn)
        }
    }

}

module.exports = Server