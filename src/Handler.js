'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module Handler
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Handler class
 */



const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;



// const debug = debuglog('server')
const Response = require('./Response')

const ContentType = require('./ContentType');

class Handler extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Handler)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }


    /**
     * @name parseJSON
     * @function
     *
     * @param {String} string the string to parse
     *  
     * @description JSON parses a string
     * @return {Object} the JSON.parsed object
     * 
     */
    parseJSON(string) {
        try {
            return JSON.parse(string)
        } catch (error) {
            return {}
        }
    }

    _httpMethodList() {
        return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }

    /**
     * @name serverRequestHandler
     * @function
     * 
     * @param {Request}  request the request object
     * @param {Response} response the response object
     * 
     * @description sets, configures, processes, and handles all and every server requests and responses
     * @return does not return anything
     * 
     */

    handle(request, response) {

        // get the url and parse it
        const parseURL = url.parse(request.url, true)
            // get the path from the url
        const path = parseURL.pathname
            // trim the path
        const trimmedPath = path.replace(/^\/+|\/+$/g, '')
            // query string variable
        const params = parseURL.query
            // decode string
        const decoder = new StringDecoder('utf-8')
        var buffer = ``
        request
            .on('error', error => { console.log('request error', error) })
            .on('data', data => { buffer += decoder.write(data) })
            .on('end', () => {

                new ContentType({ request, response }).contentTypes()

                buffer += decoder.end()
                request.body = this.parseJSON(buffer)
                request.query = params
                request.paths = trimmedPath
                request.params = {}

                response.status = status => new Response({ status, response })
                let res = new Response({ request, response })
                response.send = res.parser


                for (let method of this._httpMethodList()) {
                    if (request.method === method) {
                        this.emit(method, trimmedPath, request, response)
                    }
                }
            })
    }

}

module.exports = Handler