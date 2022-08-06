'use strict'

/** 
 * @author Ericson S. Weah 
 *     email: ericson.weah@ericsonweah.com
 *     phone: +1.385.436.1984
 *     website: https://www.ericsonweah.com
 *     github: https://github.com/ericsonsweah
 * 
 * @module Utilities
 * @kind class
 * 
 * @extends Transform
 * @requires Transform
 * 
 * @classdesc Utilities class
 */

const Env = require('../.env')
const { exec } = require('child_process')
const util = require('util')
const { join } = require('path')

class Utilities extends require('./Base') {

    constructor(options = {}) {

        super({ objectMode: true, encoding: 'utf-8', autoDestroy: true })

        Object.keys(options).forEach(key => { this[key] = options[key] })

        // auto bind methods
        this.autobind(Utilities)
            //Set maximum number of listeners to infinity
        this.setMaxListeners(Infinity)

    }

    /**
     * @name objectCopy
     * @function
     *
     * @param {Object} obj the object whose deep copy to be made
     *  
     * @description makes a deep copy of an object 
     * @return {Object} copy, the copy of the original object
     * 
     */
    objectCopy(obj) {
        const copy = Object.create(Object.getPrototypeOf(obj));
        const propNames = Object.getOwnPropertyNames(obj);
        propNames.forEach(name => {
            const desc = Object.getOwnPropertyDescriptor(obj, name);
            Object.defineProperty(copy, name, desc);
        });
        return copy;
    };

    /**
     * @name clean
     * @function
     *
     * @param {String} string the string to cleanr
     *      
     * @description trim and clean a string 
     * @return {String} the cleaned strim
     * 
     */

    clean(string = '') {
        return typeof string === 'string' && string.trim().length > 0 ? string.trim().split('').filter(str => str != '').map(str => str.trim()).join('') : string;
    }

    /**
     * @name stringLength
     * @function
     *
     * @param {String} string the string to cleanr
     *      
     * @description trim and clean a string 
     * @return {String} the cleaned strim
     * 
     */

    stringLength(string = '') {
        return typeof string === 'string' && string.trim().length > 0 ? this.clean(string).length : string;
    }


    /**
     * @name isArray
     * @function
     *
     * @param {Object} obj the object to check
     *  
     * @description checks if the object is an array 
     * @return {Boolean} true if the object is an array; false otherwise
     * 
     */

    isArray(obj) {
        try {
            if (Array.isArray(obj)) {
                return true
            } else {
                return false
            }
        } catch (er) {
            return false
        }
    }

    /**
     * @name isArrayLength
     * @function
     *
     * @param {Object} obj the object to check
     *  
     * @description checks if the object is an array and the has a non-zero length
     * @return {Boolean} true if the object is an array and has a non-zero length; false otherwise
     * 
     */
    isArrayLength(obj) {
        try {
            if (this.isArray(obj) && obj.length > 0) {
                return true
            } else {
                return false
            }
        } catch (er) {
            return false
        }
    }

    /**
     * @name makeArray
     * @function
     *
     * @param {Array} arr the object to check
     *  
     * @description checks if the object is an array. It not it puts it in an empty array
     * @return {Array} the array object the object
     * 
     */
    makeArray(arr = []) {
            const arrayObject = []
            arrayObject.push(arr)
            return this.isArray(arr) ? arr : arrayObject
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

    /**
     * @name jString
     * @function
     *
     * @param {String} string the string to JSON stringify
     *  
     * @description JSON stringifies a string
     * @return {Object} the JSON.stringified object
     * 
     */
    jString(string) {
        try {
            return JSON.stringify(string) //, replacer, key, value, space)
        } catch (error) {
            return {}
        }
    }

    /**
     * @name hash
     * @function
     *
     * @param {String} string the string to hash
     *  
     * @description hashes a string 
     * @return {String} the hashed string
     * 
     */
    hash(string) {
        if (typeof string == 'string' && string.trim().length > 0) {
            const hash = require('crypto').createHmac(Env.PASSWORD._HASH._METHOD, Env.PASSWORD._HASH._SECRET).update(string).digest('hex');
            return hash;
        } else {
            return false;
        }

    };

    /**
     * @name createRandomString
     * @function
     *
     * @param {String} string the string to hash
     *  
     * @description creates a string of random alpha numeric characters for a given string length
     * @return {String} the random string
     * 
     */

    createRandomString(stringLength) {
        stringLength = typeof stringLength == 'number' && stringLength > 0 ? stringLength : false;

        if (stringLength) {
            // Define all the possible characters  that could go in a string.
            const possibleCharacters = 'abcdefghklmnopqrstxvwyz0123456789ABCEFGHKLMNOPQRSTVWXYZ';
            // star the final string
            let string = '';
            for (let i = 0; i < stringLength; i++) {
                //  Get a random character from the possibleCharacters string
                let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
                //  Append this character  to the final string
                string += randomCharacter;
            }
            // return final string
            return string;
        } else {
            return false;
        }
    };

    /**
     * @name getRandomInt
     * @function
     *
     * @param {Number} min the minimum value of the random number to generate
     * @param {Number} max the maximum value of the random number to generate
     *  
     * @description generates a random number from a minimum value and maximum value
     * 
     * @return {String} the random number
     * 
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    /**
     * @name generateOrderNumberFirstSet
     * @function
     *  
     * @description generates the first set of number of the first part of the order number
     * 
     * @return {String} the first set of number: 3 numbers
     * 
     */
    generateOrderNumberFirstSet() {
        let first = this.getRandomInt(0, 999)
        let fzeros = ''
        if (first.toString().length < 3) {
            let diff = 3 - first.toString().length

            while (fzeros.length < diff) {
                fzeros += '0'
            }

        }
        return `${this.randomLetterGen()}${fzeros}${first.toString()}`
    }

    /**
     * @name generateOrderNumberSecondSet
     * @function
     *  
     * @description generates the second set of number of the second part of the order number
     * 
     * @return {String} the second set of number: 7 numbers
     * 
     */
    generateOrderNumberSecondSet() {
            let second = this.getRandomInt(0, 9999999)
            let szeros = ''
            if (second.toString().length < 7) {
                let diff = 7 - second.toString().length

                while (szeros.length < diff) {
                    szeros += '0'
                }
            }
            return `${this.randomLetterGen()}${szeros}${second.toString()}`
        }
        /**
         * @name generateOrderNumberThirdSet
         * @function
         *  
         * @description generates the third set of number of the third part (or last part) of the order number
         * 
         * @return {String} the third set of number: 10 numbers
         * 
         */
    generateOrderNumberThirdSet() {
        let third = this.getRandomInt(0, 9999999999)
        let tzeros = ''
        if (third.toString().length < 10) {
            let diff = 7 - third.toString().length

            while (tzeros.length < diff) {
                tzeros += '0'
            }

        }
        return `${this.randomLetterGen()}${tzeros}${third.toString()}`
    }

    /**
     * @name generateOrderNumber
     * @function
     *  
     * @description generates order numbers
     * 
     * @return {String} the generated order number
     * 
     */
    generateOrderNumber() {
        const sfinal = this.generateOrderNumberSecondSet()
        const ffinal = this.generateOrderNumberFirstSet()
        const tfinal = this.generateOrderNumberThirdSet()
        const final = `ORDER# ${ffinal}-${sfinal}-${tfinal}`
        return final
    }

    /**
     * @name orderPrice
     * @function
     * 
     * @param {Array} products the order products list
     * 
     * @description calculates order total prices
     * 
     * @return {String} the order total price
     * 
     */
    orderPrice(products = []) {
            if (products && products.length > 0) {
                const subtotal = products
                    .map(datum => parseFloat(datum.pricing.subtotal.substring(1)))
                    .reduce((x, y) => x + y, 0)

                // const quantity = this.products
                //   .map(datum => parseInt(datum.pricing.quantity))
                //   .reduce((x, y) => x + y, 0)

                const taxing = 0.07 * subtotal
                    // const taxed = taxing.toFixed(2)

                const totaling = taxing + subtotal
                const total = totaling.toFixed(2)
                return total
            } else {
                return '0.00'
            }
        }
        /**
         * @name pluralize
         * @function
         * 
         * @param {String} item the item name
         * @param {Number} quantity the item quantity
         * 
         * @description builds the plural forms for regular words
         * 
         * @return {String} return the words either singular or plural
         * 
         */
    pluralize(item, quantity) {
        return (quantity > 1 ? `${item}s` : `${item}`)
    };

    /**
     * @name run
     * @function
     * 
     * @param {String} commands the bash command to run
     * @param {Object} options the options for the bash command
     * @param {Function} fn the callback function
     * 
     * @description sends emails, sms; processes payments, and executes schedules, and much more ...
     * 
     * @return {Function} function that executes the chil_process command
     * 
     */

    async run(commands = 'ls -las', options = {}, fn = () => {}) {
        return require('child_process').exec(commands, options, fn);
    }


    /**
     * @name maxString
     * @function
     * 
     * @param {String} a the string
     * 
     * @description sorts at string 
     * @return {Function} the sorted string
     * 
     */

    maxString(a) {
        return [...a].sort().pop()
    }

    /**
     * @name randomLetterGen
     * @function
     * 
     * @description generates a random letter from A to Z 
     * @return {String} the random letter
     * 
     */
    randomLetterGen() {
        const min = 'A'.charCodeAt()
        const max = 'Z'.charCodeAt()
        return String.fromCharCode(Math.floor(Math.random() * (1 + max - min)) + min)
    }

    /**
     * @name getRandomFileNames
     * @function
     * 
     * @param {String} fileExtension the file extension name
     * 
     * @description generates a random file name
     * 
     * @return {String} the generated file name
     * 
     */
    getRandomFileNames(fileExtension = '') {
        const NAME_LENGTH = 12
        let namePart = new Array(NAME_LENGTH)
        for (let i = 0; i < NAME_LENGTH; i++) {
            namePart[i] = randomLetterGen()
        }
        return namePart.join('') + fileExtension
    }





    /**
     * Stringify JSON, like JSON.stringify, but v8 optimized, with the
     * ability to escape characters that can trigger HTML sniffing.
     *
     * @param {*} value
     * @param {function} replaces
     * @param {number} spaces
     * @param {boolean} escape
     * @returns {string}
     * @private
     */
    stringify(value, replacer, spaces, escape) {
        // v8 checks arguments.length for optimizing simple call
        // https://bugs.chromium.org/p/v8/issues/detail?id=4730
        var json = replacer || spaces ?
            JSON.stringify(value, replacer, spaces) :
            JSON.stringify(value);

        if (escape) {
            json = json.replace(/[<>&]/g, function(c) {
                switch (c.charCodeAt(0)) {
                    case 0x3c:
                        return '\\u003c'
                    case 0x3e:
                        return '\\u003e'
                    case 0x26:
                        return '\\u0026'
                            /* istanbul ignore next: unreachable default */
                    default:
                        return c
                }
            })
        }

        return json
    }

    /**
     * @name pluckOff
     * @function
     *
     * @param {Function|Object} fn  the function to bind to object method
     *  
     * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
     * 
     *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
     * 
     * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
     * 
     * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
     * 
     */

    pluckOff(fn) {
        return (...args) => fn.bind(...args)()
    }

    /**
     * @name promisify
     * @function
     *
     * @param {Function|Object} fn the function or object to be promisified
     *  
     * @description promisified functions or objects
     * @return {Function|Object} fn, the promisified function
     * 
     */
    promisify(fn) {
        return (...args) => new Promise((resolve, reject) => fn(...args), (err, data) => (err ? reject(err) : resolve(data)))
    }


    /**
     * @name getField
     * @function
     *
     * @param {String|Object} attribute the attribute to extract
     *  
     * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
     * 
     * @return {Function|Object} object, the function that will be able to extract an attribute from an object
     * 
     */
    getField(attribute) {
        return object => object[attribute]
    }

    /**
     * @name pluckOff
     * @function
     *
     * @param {Function|Object} fn  the function to bind to object method
     *  
     * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
     * 
     *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
     * 
     * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
     * 
     * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
     * 
     */

    pluckOff(fn) {
        return (...args) => fn.bind(...args)()
    }

    /**
         * @name callOnlyNTimes
         * @function
         *
         * @param {Function|Object} f the function to be called only n times
      
         * @param {Number} n number of time the function f() should be called
         *  
         * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
         * 
         * @return {Function|Object} a function that calls fn() only n times
         * 
         */
    callOnlyNTimes(fn, n = 1) {
        let done = false
        return (...args) => {
            if (!done) {
                done = true
                for (let i = 0; i < Math.abs(n); i++) {
                    fn(...args)
                }
            }
        }
    }

    /**
     * @name callFirstOnlyNTimes
     * @function
     *
     * @param {Function|Object} f the function to be called only n times
     * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
     * @param {Number} n number of time the function f() should be called
     *  
     * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
     * 
     * @return {Function|Object} a function that calls fn() only n times and g() afterward
     * 
     */
    callFirstOnlyNTimes(f = () => {}, g = () => {}, n = 1) {
        let done = false
        return (...args) => {
            if (!done) {
                done = true
                if (typeof n !== 'number' || n % 1 !== 0) {
                    f(...args)
                } else {
                    for (let i = 1; i <= Math.abs(n); i++) {
                        f(...args)
                    }
                }
            } else {
                g(...args)
            }
        }
    }

    /**
     * @name inputsValid
     * @function
     *
     * @param {Function} arr  the array to validate
     * @param {Function} fn  the call back function to validate
     * @param {Number} flat arr flattening depth to validate
     *  
     * @description validates inputs
     * 
     * @return {Boolean} true if inputs are valid and false if inputs are invalid
     * 
     */
    inputsValid(arr = [], fn = () => {}, flat = 1) {
        if (!Array.isArray(arr)) return false
        if (typeof fn !== 'function') return false;
        if (typeof flat !== 'number' || flat < 0 || (flat % 1 !== 0 && flat !== Infinity)) return false;
        return true
    }

    /**
     * @name none
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array
     * 
     * @return {Array|Object} array, the filtered array for which the predicate is true
     * 
     */
    none(arr = [], fn = () => false, flat = 0) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).every(v => !fn(v)) : false
    }

    /**
     * @name forEachAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  loops an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */
    forEachAsync(arr = [], fn = () => false, flat = 0) {
        if (this.inputsValid(arr, fn, flat)) {
            return arr.flat(flat).reduce((promise, value) => promise.then(() => fn(value)), Promise.resolve());
        } else {
            return undefined
        }

    }

    /**
     * @name mapAsync
     * @function
     *
     * @param {Array|Object} arr the array to loop throug
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  maps an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */
    mapAsync(arr = [], fn = () => [], flat = 0) {
        return this.inputsValid(arr, fn, flat) ? Promise.all(arr.flat(flat).map(fn)) : []
    }

    /**
     * @name filterAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  filters an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */

    async filterAsync(arr = [], fn = () => [], flat = 0) {
        if (this.inputsValid(arr, fn, flat)) {
            const array = await this.mapAsync(fn, flat)
            return arr.flat(flat).filter((v, i) => Boolean(array[i]))
        } else {
            return []
        }
    }

    /**
     * @name reduceAsync
     * @function
     *
     * @param {Array|Object} arr the array to filter
     * @param {Function|Object} fn the callback function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description asynchronously  reduces an array
     * 
     * @return {Promise}  a promise if promise is fulfilled and successfull
     * 
     */

    async reduceAsync(arr = [], fn = () => {}, init, flat = 0) {
            if (this.inputsValid(arr, fn, flat)) {
                return Promise.resolve(init).then(accumulator => this.forEachAsync(arr.flat(flat), async(v, i) => {
                    accumulator = fn(accumulator, v, i)
                }).then(() => accumulator));
            } else {
                return 0
            }
        }
        /**
         * @name filter
         * @function
         *
         * @param {Array|Object} arr the array to filter
         * @param {Function|Object} fn the call back function
         * @param {Number} flat  the array to filter flattening depth
         *  
         * @description filters an array
         * 
         * @return {Array|Object} array, the filtered array
         * 
         */
    filtered(arr = [], fn = () => [], flat = 1) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).filter(x => fn(x)) : []
    }

    /**
     * @name filterItems
     * @function
     * 
     * @param {Array|Object} arr the array to filter
     * @param {String} query any fitlering query
     *  
     * @description asynchronously read a query and filter arrays according to the query
     * 
     * @return {Array}  the query filtered array
     * 
     */
    filterItems(query, arr = []) {
        if (!Array.isArray(arr)) return []
        return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }

    /**
     * @name some
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
     * 
     */
    some(arr = [], fn = () => false, flat = 0) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x || fn(y), false) : false
    }

    /**
     * @name every
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
     * 
     */
    every(arr = [], fn = () => false, flat = 0) {
        if (this.inputsValid(arr, fn, falt)) {
            let result = [];
            arr.flat(flat).reduce((x, y) => (x === false && fn(y) ? result.push(y) : result.pop()), false);
            return result.length === arr.flat(flat).length ? true : false;
        } else {
            return false
        }
    }

    /**
     * @name forEach
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description performs fn() operation for each of the array elements
     * 
     * @return {Function|Object} the resulting object or array or element from the fn() operation 
     * 
     */

    forEach(arr = [], fn = () => false, flat = 0) {
        if (this.inputsValid(arr, fn, flat)) {
            for (let i = 0; i < arr.flat(flat).length; i++) {
                fn(arr.flat(flat)[i]);
            }
        } else {
            return undefined
        }
    };

    /**
     * @name filter
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description filters an array according to the thruthiness of the predicate
     * 
     * @return {Array} the resulting array
     * 
     */

    filter(arr = [], fn = () => false, flat = 0) {
        if (this.inputsValid(arr, fn, flat)) {
            let result = [];
            for (let i = 0; i < this.flat(flat).length; i++) {
                fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
            }
            return result.length > 0 ? result : [];
        } else {
            return []
        }
    };

    /**
     * @name flatten
     * @function
     *
     * @param {Array} arr the array to flatten
     *  
     * @description filten an array to whatsover depth or level it has
     * 
     * @return {Array} the resulting flattened array
     * 
     */

    flatten(arr = []) {
        const result = [];
        arr.forEach(el => (Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)));
        return result;
    }

    /**
     * @name findIndex
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back funcction
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description find the index of an array element
     * 
     * @return {Array} the resulting array element
     * 
     */
    findIndex(arr = [], fn = () => false, flat = 0) {
        if (this.inputsValid(arr, fn, flat)) {
            return arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1);
        } else {
            return undefined
        }


    };

    /**
     * @name map
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the call back function
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description maps each element with the resulting operation of the callback function
     * 
     * @return {Array} the resulting array 
     * 
     */
    map(arr = [], fn = () => [], flat = 0) {
        return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), []) : []
    };

    /**
     * @name find
     * @function
     *
     * @param {Array} arr the array to filter
     * @param {Function} fn the predicate
     * @param {Number} flat  the array to filter flattening depth
     *  
     * @description find the first array element for which the predicate is true
     * 
     * @return {Array} the resulting array element
     * 
     */
    find(arr = [], fn = () => false, flat = 0) {
            return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined) : undefined;
        }
        /**
         * @name userHasLoggedIn
         * @function
         *
         * @param {Object} user the customer or user object
         * 
         * @description emits  'user-has-logged-in' event
         * @return does not return anything
         * 
         */
    userHasLoggedIn(user) {
        this.emit('user-has-logged-in', user)
    }

    /**
     * @name userHasLoggedOut
     * @function
     *
     * @param {Object} user the customer or user object
     * 
     * @description emits  'user-has-logged-out' event
     * @return does not return anything
     * 
     */
    userHasLoggedOut(user) {
        this.emit('user-has-logged-out', user)
    }

    /**
     * @name guestHasPlacedAnOrder
     * @function
     *
     * @param {Object} order the guest customer's order object or guest user's order object
     * 
     * @description emits  'guest-has-placed-an-order' event
     * @return does not return anything
     * 
     */
    guestHasPlacedAnOrder(order) {
        this.emit('guest-has-placed-an-order', order)
    }

    /**
     * @name userHasPlacedAnOrder
     * @function
     *
     * @param {Object} order the authenticated customer's order object or authenticated user's order object
     * 
     * @description emits  'user-has-placed-an-order' event
     * @return does not return anything
     * 
     */
    userHasPlacedAnOrder(order) {
        this.emit('user-has-placed-an-order', order)
    }

    /**
     * @name userHasRegistered
     * @function
     *
     * @param {Object} user the newly registered customer object or newly registered user object
     * 
     * @description emits  'user-has-registered' event
     * @return does not return anything
     * 
     */
    userHasRegistered(user) {
        this.emit('user-has-registered', user)
    }

    /**
     * @name userHasUpdatedAccountDetails
     * @function
     *
     * @param {Object} account the authenticated customer's account details object or authenticated user's account details object
     * 
     * @description emits  'user-has-updated-account-details' event
     * @return does not return anything
     * 
     */
    userHasUpdatedAccountDetails(account) {
        this.emit('user-has-updated-account-details', account)
    }

    /**
     * @name userHasDeletedAccount
     * @function
     *
     * @param {Object} user the authenticated customer  object or authenticated user object
     * 
     * @description emits  'user-has-deleted-account' event
     * @return does not return anything
     * 
     */
    userHasDeletedAccount(user) {
        this.emit('user-has-deleted-account', user)
    }

    /**
     * @name requested
     * @function
     *
     * @param {Request|Object} request the object 
     * 
     * @description emits  'requested' event
     * @return does not return anything
     * 
     */
    requested(request) {
        this.emit('requested', request)
    }

    /**
     * @name responded
     * @function
     *
     * @param {Response|Object} response the object 
     * 
     * @description emits  'responded' event
     * @return does not return anything
     * 
     */
    responded(response) {
        this.emit('responded', response)
    }

    findAllEventsAndRemoveDuplicatedListeners() {
        for (let event in this.eventNames()) {
            if (event !== 'prefinish') {
                this.removeDuplicateListeners(event)
            }
        }
    }
    removeDuplicateListeners(event) {
        if (this.rawListeners(event).length > 1) {
            for (let i = 1; i < this.rawListeners(event).length; i++) {
                this.removeListener(event, this.rawListeners(event)[i])
            }
        }
    }
    split(string = '', delimiters = '') {
        return typeof(string) === 'string' && string.trim().length > 0 ? string.split(delimiters).filter(str => str !== '').map(str => str.trim()) : []
    }

    path(path = 255) {
        return join(__dirname, `${this.createRandomString(path)}`)
    }
    schema(path = '.') {
        return join(__dirname, `${path}`)
    }
    async run(path) {
        return util.promisify(exec)(path)
    }

}

module.exports = Utilities