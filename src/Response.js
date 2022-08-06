'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * @module Response
 * @kind class
 * 
 * @extends Base
 * @requires Base
 * 
 * @classdesc Base class
 */


class Response extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Response)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)
    }


      // Set corresponding Content Type and return corresponding data: JSON
    jsonContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'json') {
            // set header content type to json
            this.response.setHeader('Content-Type', 'application/json');
            // Use the payload call back  by the handler or default to an empty object
            payload = typeof payload === 'object' ? payload : {};
            // Convert the payload to string
            payloadString = JSON.stringify(payload);
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }

          // Set corresponding Content Type and return corresponding data: HTML
    htmlContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'html') {
            // set header content type to html
            this.response.setHeader('Content-Type', 'text/html');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload === 'string' ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }

          // Set corresponding Content Type and return corresponding data: x-icon
    faviconContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'favicon') {
            // set header content type to x-icon
            this.response.setHeader('Content-Type', 'image/x-icon');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }

    // Set corresponding Content Type and return corresponding data: CSS
    cssContentType(contentType, payload, payloadString) {
        if (contentType === 'css') {
            // set header content type to css
            this.response.setHeader('Content-Type', 'text/css');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: PNG
    pngContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'png') {
            // set header content type to png
            this.response.setHeader('Content-Type', 'image/png');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }

    // Set corresponding Content Type and return corresponding data:JPEG
    jpegContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'jpeg') {
            // set header content type to jpeg
            this.response.setHeader('Content-Type', 'image/jpeg');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: PJPEG
    pjpegContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'pjpeg') {
            // set header content type to pjeg
            this.response.setHeader('Content-Type', 'image/jpeg');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: PJP
    pjpContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'pjp') {
            // set header content type to pjp
            this.response.setHeader('Content-Type', 'image/jpeg');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: JFIF
    jfifContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'jfif') {
            // set header content type to jfif
            this.response.setHeader('Content-Type', 'image/jpeg');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: JPG
    jpjContentType(contentType, payload, payloadString) {
        if (contentType === 'jpg') {
            // set header content type to jpg
            this.response.setHeader('Content-Type', 'image/jpeg');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: PLAIN
    plainContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'plain') {
            // set header content type to plain
            this.response.setHeader('Content-Type', 'text/plain');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: JAVASCRIPT
    javascriptContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'javascript') {
            // set header content type to html
            // this.response.setHeader('Content-Type', 'application/javascript');
            this.response.setHeader('Content-Type', 'application/javascript');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: JS
    jsContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === 'js') {
            // set header content type to js
            // this.response.setHeader('Content-Type', 'application/x-javascript');
            this.response.writeHead(200, {
                'Service-Worker-Allowed': '/',
                'Content-Type': 'application/javascript'
            })
            this.response.setHeader('Content-Type', 'text/javascript');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: JS
    dotjsContentType(contentType, payload, payloadString, statusCode) {
        if (contentType === '.js') {
            // set header content type to .js
            this.response.writeHead(201, {
                'Service-Worker-Allowed': '/',
                'Content-Type': 'application/javascript'
            })

            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Set corresponding Content Type and return corresponding data: SCRIPT
    scriptContentType(contentType, payload, payloadString) {
        if (contentType === 'script') {
            // set header content type to script
            this.response.setHeader('Content-Type', 'application/javascript');
            // this.response.setHeader('Content-Type', 'text/javascript');
            // Use the payload call back  by the handler or default to an empty object
            payloadString = typeof payload !== undefined ? payload : '';
            this.response.writeHead(statusCode)
            this.response.end(payloadString)
        }
    }
    // Main Parser (Response Content Type Parser)
    parser(statusCode, payload, contentType = 'json') {
        // Determine the type of response  (callback to JSON)
        contentType = (typeof(contentType) === 'string') ? contentType : 'json'

        // Use the status code callback by the handler  or default to 200
        statusCode = typeof statusCode === 'number' ? statusCode : 200;

        // return the response-parts that are content-specific 
        let payloadString = ''

        this.jsonContentType(contentType, payload, payloadString, statusCode)
        this.htmlContentType(contentType, payload, payloadString, statusCode)
        this.faviconContentType(contentType, payload, payloadString, statusCode)
        this.cssContentType(contentType, payload, payloadString, statusCode)
        this.pngContentType(contentType, payload, payloadString, statusCode)
        this.jpegContentType(contentType, payload, payloadString, statusCode)
        this.pjpegContentType(contentType, payload, payloadString, statusCode)
        this.pjpContentType(contentType, payload, payloadString, statusCode)
        this.jfifContentType(contentType, payload, payloadString, statusCode)
        this.jpjContentType(contentType, payload, payloadString, statusCode)
        this.plainContentType(contentType, payload, payloadString, statusCode)
        this.javascriptContentType(contentType, payload, payloadString, statusCode)
        this.jsContentType(contentType, payload, payloadString, statusCode)
        this.dotjsContentType(contentType, payload, payloadString, statusCode)
        this.scriptContentType(contentType, payload, payloadString, statusCode)

        // statusCode == 200 ? debug('\x1b[32m%s\x1b[0m', this.request.method + '/' + this.trimmedPath + ' ' + statusCode) : debug('\x1b[31m%s\x1b[0m', this.request.method.toUpperCase() + '/' + this.trimmedPath + ' ' + statusCode)
    }

    send(payload, contentType = 'json') {
        this.response.send = this.parser(this.status, payload, contentType)
        return this.response.send
    }

}

module.exports = Response