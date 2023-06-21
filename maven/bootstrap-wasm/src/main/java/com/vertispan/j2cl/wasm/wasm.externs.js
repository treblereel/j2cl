/**
 * @fileoverview Definitions for WebAssembly JS API
 *
 *  @see http://webassembly.org/docs/js/
 *
 * @externs
 * @author loorongjie@gmail.com (Loo Rong Jie)
 */

/**
 * @record
 */
function WebAssemblyTagOptions() {};

/**
 * @type {Array<string>}
 */
WebAssemblyTagOptions.prototype.parameters;

/**
 * @constructor
 * @param {!WebAssemblyTagOptions} type
 */
WebAssembly.Tag = function(type) {};

/**
 * @record
 */
function WebAssemblyExceptionOptions() {};

/**
 * @type {undefined|boolean}
 */
WebAssemblyExceptionOptions.prototype.traceStack;

/**
 * @constructor
 * @param {!WebAssembly.Tag} tag
 * @param {!Array} payload
 * @param {WebAssemblyExceptionOptions=} options
 */
WebAssembly.Exception = function(tag, payload, options) {};

/**
 * @type {undefined|string}
 */
WebAssembly.Exception.prototype.stack;
