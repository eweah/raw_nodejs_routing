'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.dev
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * 
 * @module ContentType
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc ContentType class
 */


const { createReadStream } = require('fs')
const { join } = require('path')
class ContentType extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(ContentType)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }

    path(path = `../../../`) {
        return join(__dirname, path, this.request.url)
    }

     // Write (Stream) Head Content Type: CSS
    cssContentType() {
        if (this.request.url.match(`\.css$`)) {
            let readable = createReadStream(this.path(), { encoding: 'utf-8' })
            this.response.writeHead(200, { 'Content-Type': 'text/css' })
            readable.pipe(this.response)
        }
    }

     // Write (Stream) Head Content Type: ICO
    icoContentType() {
        if (this.request.url.match(`\.ico$`)) {
            let readable = createReadStream(this.path(), { encoding: 'utf-8' })
            this.response.writeHead(200, { 'Content-Type': 'text/css' })
            readable.pipe(this.response)
        }
    }

     // Write (Stream) Head Content Type: JS
    jsContentType() {
        if (this.request.url.match(`\.js$`)) {
            let readable = createReadStream(this.path(), { encoding: 'utf-8' })
            this.response.writeHead(200, {
                'Service-Worker-Allowed': '/',
                'Content-Type': 'application/javascript'
            })
            readable.pipe(this.response)
        }
    }

     // Write (Stream) Head Content Type: JPG
    jpgContentType() {
        if (this.request.url.match(`\.jpg$`)) {
            let readable = createReadStream(this.path())
            this.response.writeHead(200, { 'Content-Type': 'image/jpg' })
            readable.pipe(this.response)
        }
    }

     // Write (Stream) Head Content Type: PLAIN
    plainContentType() {
        if (this.request.url.match(`\.jpg$`)) {
            let readable = createReadStream(this.path())
            this.response.writeHead(200, { 'Content-Type': 'text/plain' })
            readable.pipe(this.response)
        }
    }
     // Write (Stream) Head Content Type: PDF
    pdfContentType() {
            if (this.request.url.match(`\.pdf$`)) {
                let readable = createReadStream(this.path())
                this.response.writeHead(200, { 'Content-Type': 'application/pdf' })
                readable.pipe(this.response)
            }
        }
      // Write (Stream) Head Content Type: PNG
    pngContentType() {
        if (this.request.url.match(`\.png$`)) {
            let readable = createReadStream(this.path())
            this.response.writeHead(200, { 'Content-Type': 'image/png' })
            readable.pipe(this.response)
        }
    }
    // Available default content type to write or stream
    types() {
        return {
            '.mpeg': 'video/mpeg',
            '.mp3': 'audio/mpeg',
            '.mjs': 'text/javascript',
            '.js': 'text/javascript',
            '.jpeg': 'image/jpeg',
            '.jpg': 'image/jpeg',
            '.midi': 'audio/midi',
            '.jsonld': 'application/ld+json',
            '.json': 'application/json',
            '.aac': 'audio/aac',
            '.abw': 'application/x-abiword',
            '.arc': 'application/x-freearc',
            '.avi': 'video/x-msvideo',
            '.azw': 'application/vnd.amazon.ebook',
            '.bin': 'application/octet-stream',
            '.bmp': 'image/bmp',
            '.bz': 'application/x-bzip',
            '.bz2': 'application/x-bzip2',
            '.csh': 'application/x-csh',
            '.css': 'text/css',
            '.csv': 'text/csv',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.eot': 'application/vnd.ms-fontobject',
            '.epub': 'application/epub+zip',
            '.gz': 'application/gzip',
            '.gif': 'image/gif',
            '.htm': 'text/html',
            '.html': 'text/html',
            '.ico': 'image/vnd.microsoft.icon',
            '.ics': 'text/calendar',
            '.jar': 'application/java-archive',
            '.mpkg': 'application/vnd.apple.installer+xml',
            '.odp': 'application/vnd.oasis.opendocument.presentation',
            '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
            '.odt': 'application/vnd.oasis.opendocument.text',
            '.oga': 'audio/ogg',
            '.ogv': 'video/ogg',
            '.ogx': 'application/ogg',
            '.opus': 'audio/opus',
            '.otf': 'font/otf',
            '.png': 'image/png',
            '.pdf': 'application/pdf',
            '.php': 'application/x-httpd-php',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.rar': 'application/vnd.rar',
            '.rtf': 'application/rtf',
            '.sh': 'application/x-sh',
            '.svg': 'image/svg+xml',
            '.swf': 'application/x-shockwave-flash',
            '.tar': 'application/x-tar',
            '.tif': 'image/tiff',
            '.tiff': 'image/tiff',
            '.ts': 'video/mp2t',
            '.ttf': 'font/ttf',
            '.txt': 'text/plain',
            '.vsd': 'application/vnd.visio',
            '.wav': 'audio/wav',
            '.weba': 'audio/webm',
            '.webm': 'video/webm',
            '.webp': 'image/webp',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.xhtml': 'application/xhtml+xml',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xml': 'application/xml',
            '.xul': 'application/vnd.mozilla.xul+xml',
            '.zip': 'application/zip',
            '.3gp_67': 'video/3gpp',
            '.3gp_68': 'audio/3gpp',
            '.3g2_68': 'video/3gpp2',
            '.3g2_69': 'audio/3gpp',
            '.7z': 'application/x-7z-compressed'
        }
    }


 // Write (Stream) Corresponding Content Types
    contentTypes() {
        Object.keys(this.types()).forEach(key => {
            let readable
            if (this.request.url.match(`\.${key}$`)) {
                if (key === '.css' || key === '.js' || key === '.mjs') {
                    readable = createReadStream(this.path('../'), { encoding: 'utf-8' })
                } else if (key === '.ico') {
                    readable = createReadStream(this.path('../public'))
                } else if (key === '.png') {
                    readable = createReadStream(this.path('../public/images'))
                } else {
                    readable = createReadStream(this.path())
                }
                if (key !== '.htm' && key !== '.html') {
                    this.response.writeHead(200, { 'Content-Type': this.types()[key] })
                    readable.pipe(this.response)
                }
            }
        })
    }

}

module.exports = ContentType