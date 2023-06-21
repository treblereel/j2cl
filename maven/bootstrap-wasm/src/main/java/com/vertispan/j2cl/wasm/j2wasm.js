// Copyright 2021 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('j2wasm');

const ArrayUtils = goog.require('j2wasm.ArrayUtils');
const j2wasm_CharUtils = goog.require('j2wasm.CharUtils');
const j2wasm_ConsoleUtils = goog.require('j2wasm.ConsoleUtils');
const j2wasm_DoubleUtils = goog.require('j2wasm.DoubleUtils');
const j2wasm_ExceptionUtils = goog.require('j2wasm.ExceptionUtils');
const j2wasm_StringUtils = goog.require('j2wasm.StringUtils');


/**
 * Instantiates a web assembly module passing the necessary imports and any
 * additional import the user might need to provide for their application.
 *
 * @param {string|!Promise<!Response>} urlOrResponse
 * @param {?Object<string, !Function>=} userImports
 * @return {!Promise<!WebAssembly.Instance>}
 */
async function instantiateStreaming(urlOrResponse, userImports) {
  return instantiateStreamingOverridingImports(
      urlOrResponse, createImportObject(userImports));
}

/**
 * Instantiates a web assembly module passing the specified imports.
 *
 * @param {string|!Promise<!Response>} urlOrResponse
 * @param {!Object<!Object>} imports
 * @return {!Promise<!WebAssembly.Instance>}
 */
async function instantiateStreamingOverridingImports(urlOrResponse, imports) {
  const response =
      typeof urlOrResponse == 'string' ? fetch(urlOrResponse) : urlOrResponse;
  const {instance} = await WebAssembly.instantiateStreaming(response, imports);
  return instance;
}

/**
 * Instantiates a web assembly module passing the necessary imports and any
 * additional import the user might need to provide for their application.
 *
 * Use of this function is discouraged. Many browsers require when calling the
 * WebAssembly constructor that the number of bytes of the module is under a
 * small threshold, mandating the async functions for all non-trivial apps. This
 * function can be used in other contexts, such as the D8 command line.
 *
 * @param {!BufferSource} moduleObject
 * @param {?Object<string, !Function>=} userImports
 * @return {!WebAssembly.Instance}
 */
function instantiateBlocking(moduleObject, userImports) {
  return instantiateBlockingOverridingImports(
      moduleObject, createImportObject(userImports));
}

/**
 * Instantiates a web assembly module passing the specified imports.
 *
 * Use of this function is discouraged. Many browsers require when calling the
 * WebAssembly constructor that the number of bytes of the module is under a
 * small threshold, mandating the async functions for all non-trivial apps. This
 * function can be used in other contexts, such as the D8 command line.
 *
 * @param {!BufferSource} moduleObject
 * @param {!Object<!Object>} imports
 * @return {!WebAssembly.Instance}
 */
function instantiateBlockingOverridingImports(moduleObject, imports) {
  return new WebAssembly.Instance(
      new WebAssembly.Module(moduleObject), imports);
}

/**
 * @param {?Object<string, !Function>=} userImports
 * @return {!Object<!Object>} Wasm import object
 */
function createImportObject(userImports) {
  const jreImports = {
    'j2wasm.ExceptionUtils.tag': j2wasm_ExceptionUtils.tag,
    'Date.UTC': Date.UTC,
    'Date.constructor': () => new Date(),
    'Date.constructor$1': (/** number */ milliseconds, ) => new Date(milliseconds, ),
    'Date.constructor$7': (/** number */ year, /** number */ month, /** number */ dayOfMonth, /** number */ hours, /** number */ minutes, /** number */ seconds, /** number */ millis, ) => new Date(year, month, dayOfMonth, hours, minutes, seconds, millis, ),
    'Date.getDate': (/** !Date */ $instance, ) => $instance.getDate(),
    'Date.getDay': (/** !Date */ $instance, ) => $instance.getDay(),
    'Date.getFullYear': (/** !Date */ $instance, ) => $instance.getFullYear(),
    'Date.getHours': (/** !Date */ $instance, ) => $instance.getHours(),
    'Date.getMilliseconds': (/** !Date */ $instance, ) => $instance.getMilliseconds(),
    'Date.getMinutes': (/** !Date */ $instance, ) => $instance.getMinutes(),
    'Date.getMonth': (/** !Date */ $instance, ) => $instance.getMonth(),
    'Date.getSeconds': (/** !Date */ $instance, ) => $instance.getSeconds(),
    'Date.getTime': (/** !Date */ $instance, ) => $instance.getTime(),
    'Date.getTimezoneOffset': (/** !Date */ $instance, ) => $instance.getTimezoneOffset(),
    'Date.getUTCDate': (/** !Date */ $instance, ) => $instance.getUTCDate(),
    'Date.getUTCFullYear': (/** !Date */ $instance, ) => $instance.getUTCFullYear(),
    'Date.getUTCHours': (/** !Date */ $instance, ) => $instance.getUTCHours(),
    'Date.getUTCMinutes': (/** !Date */ $instance, ) => $instance.getUTCMinutes(),
    'Date.getUTCMonth': (/** !Date */ $instance, ) => $instance.getUTCMonth(),
    'Date.getUTCSeconds': (/** !Date */ $instance, ) => $instance.getUTCSeconds(),
    'Date.now': Date.now,
    'Date.parse': Date.parse,
    'Date.setDate$1': (/** !Date */ $instance, /** number */ dayOfMonth, ) => $instance.setDate(dayOfMonth, ),
    'Date.setFullYear$1': (/** !Date */ $instance, /** number */ year, ) => $instance.setFullYear(year, ),
    'Date.setFullYear$3': (/** !Date */ $instance, /** number */ year, /** number */ month, /** number */ day, ) => $instance.setFullYear(year, month, day, ),
    'Date.setHours$1': (/** !Date */ $instance, /** number */ hours, ) => $instance.setHours(hours, ),
    'Date.setHours$4': (/** !Date */ $instance, /** number */ hours, /** number */ mins, /** number */ secs, /** number */ ms, ) => $instance.setHours(hours, mins, secs, ms, ),
    'Date.setMinutes$1': (/** !Date */ $instance, /** number */ minutes, ) => $instance.setMinutes(minutes, ),
    'Date.setMonth$1': (/** !Date */ $instance, /** number */ month, ) => $instance.setMonth(month, ),
    'Date.setSeconds$1': (/** !Date */ $instance, /** number */ seconds, ) => $instance.setSeconds(seconds, ),
    'Date.setTime$1': (/** !Date */ $instance, /** number */ milliseconds, ) => $instance.setTime(milliseconds, ),
    'Date.toLocaleString': (/** !Date */ $instance, ) => $instance.toLocaleString(),
    'Math.acos': Math.acos,
    'Math.asin': Math.asin,
    'Math.atan': Math.atan,
    'Math.atan2': Math.atan2,
    'Math.cbrt': Math.cbrt,
    'Math.cos': Math.cos,
    'Math.cosh': Math.cosh,
    'Math.exp': Math.exp,
    'Math.expm1': Math.expm1,
    'Math.hypot': Math.hypot,
    'Math.log': Math.log,
    'Math.log10': Math.log10,
    'Math.log1p': Math.log1p,
    'Math.pow': Math.pow,
    'Math.random': Math.random,
    'Math.round': Math.round,
    'Math.sign': Math.sign,
    'Math.sin': Math.sin,
    'Math.sinh': Math.sinh,
    'Math.tan': Math.tan,
    'Math.tanh': Math.tanh,
    'Number.prototype.toPrecision.call$2': (/** number */ value, /** number */ precision, ) => Number.prototype.toPrecision.call(value, precision, ),
    'Number.prototype.toString.call$1': (/** number */ d, ) => Number.prototype.toString.call(d, ),
    'Number.prototype.toString.call$2': (/** number */ i, /** number */ radix, ) => Number.prototype.toString.call(i, radix, ),
    'RegExp.constructor$1': (/** string */ regex, ) => new RegExp(regex, ),
    'RegExp.constructor$2': (/** string */ regex, /** string */ mode, ) => new RegExp(regex, mode, ),
    'RegExp.exec$1': (/** !RegExp */ $instance, /** string */ value, ) => $instance.exec(value, ),
    'RegExp.test$1': (/** !RegExp */ $instance, /** string */ value, ) => $instance.test(value, ),
    'RegExpResult.at$1': (/** !RegExpResult */ $instance, /** number */ index, ) => $instance.at(index, ),
    'get RegExpResult.index': (/** !RegExpResult */ $instance, ) => $instance.index,
    'get RegExpResult.length': (/** !RegExpResult */ $instance, ) => $instance.length,
    'j2wasm.CharUtils.charToLowerCase': j2wasm_CharUtils.charToLowerCase,
    'j2wasm.CharUtils.charToUpperCase': j2wasm_CharUtils.charToUpperCase,
    'j2wasm.CharUtils.codePointToLowerCase': j2wasm_CharUtils.codePointToLowerCase,
    'j2wasm.CharUtils.codePointToUpperCase': j2wasm_CharUtils.codePointToUpperCase,
    'j2wasm.ConsoleUtils.log': j2wasm_ConsoleUtils.log,
    'j2wasm.DoubleUtils.dmod': j2wasm_DoubleUtils.dmod,
    'j2wasm.DoubleUtils.isValidDouble': j2wasm_DoubleUtils.isValidDouble,
    'j2wasm.ExceptionUtils.create': j2wasm_ExceptionUtils.create,
    'j2wasm.ExceptionUtils.throwException': j2wasm_ExceptionUtils.throwException,
    'j2wasm.StringUtils.compareToIgnoreCase': j2wasm_StringUtils.compareToIgnoreCase,
    'j2wasm.StringUtils.equalsIgnoreCase': j2wasm_StringUtils.equalsIgnoreCase,
    'parseFloat': parseFloat,
    'performance.now': () => performance.now(),
    'set RegExp.lastIndex': (/** !RegExp */ $instance, /** number */ index, ) => $instance.lastIndex = index,
    'string.indexOf$1': (/** string */ $instance, /** string */ str, ) => $instance.indexOf(str, ),
    'string.indexOf$2': (/** string */ $instance, /** string */ str, /** number */ startIndex, ) => $instance.indexOf(str, startIndex, ),
    'string.lastIndexOf$1': (/** string */ $instance, /** string */ str, ) => $instance.lastIndexOf(str, ),
    'string.lastIndexOf$2': (/** string */ $instance, /** string */ str, /** number */ start, ) => $instance.lastIndexOf(str, start, ),
    'string.replace$2': (/** string */ $instance, /** !RegExp */ regex, /** string */ replace, ) => $instance.replace(regex, replace, ),
    'string.toLocaleLowerCase': (/** string */ $instance, ) => $instance.toLocaleLowerCase(),
    'string.toLocaleUpperCase': (/** string */ $instance, ) => $instance.toLocaleUpperCase(),
    'string.toLowerCase': (/** string */ $instance, ) => $instance.toLowerCase(),
    'string.toUpperCase': (/** string */ $instance, ) => $instance.toUpperCase(),
  };

  return {
    // Pass the imports required by the jre plus the additional provided by the
    // user. The user imports will override the jre imports if they provide
    // the same key.
    'imports': Object.assign({}, jreImports, userImports)
  };
}

/**
 * @param {!Date} date
 * @param {...number} dateParts
 */
function dateSetFullYear(date, ...dateParts) {
  date.setFullYear(...dateParts);
}

/**
 * @param {!Date} date
 * @param {...number} timeParts
 */
function dateSetHours(date, ...timeParts) {
  date.setHours(...timeParts);
}

exports = {
  instantiateStreaming,
  instantiateBlocking,
  instantiateStreamingOverridingImports,
  instantiateBlockingOverridingImports,
};
