/**
 * Impl super source for java.lang.Object.
 */
goog.module('gen.java.lang.Object$impl');


let $Hashing = goog.require('nativebootstrap.Hashing$impl');
let $Util = goog.require('nativebootstrap.Util$impl');

let Class = goog.forwardDeclare('gen.java.lang.Class$impl');


class Object {
  // TODO(michaelthomas): Make private when b/27149891 is resolved.
  /**
   * Defines instance fields.
   */
  constructor() {}

  /**
   * Runs inline instance field initializers.
   * @private
   */
  $init__java_lang_Object() {}

  /**
   * A particular Java constructor as a factory method.
   * @return {!Object}
   * @public
   */
  static $create() {
    Object.$clinit();
    let instance = new Object;
    instance.$ctor__java_lang_Object();
    return instance;
  }

  /**
   * Initializes instance fields for a particular Java constructor.
   * @protected
   */
  $ctor__java_lang_Object() { this.$init__java_lang_Object(); }

  /**
   * @return {Class}
   * @public
   */
  m_getClass() { return Class.$get(this.constructor); }

  /**
   * @return {number}
   * @public
   */
  m_hashCode() { return $Hashing.$getHashCode(this); }

  /**
   * @param {*} other
   * @return {boolean}
   * @public
   */
  m_equals__java_lang_Object(other) { return this === other; }

  /**
   * @return {?string}
   * @public
   */
  $javaToString() {
    // TODO: fix this implementation. The hash code should be returned in hex
    // but can't currently depend on Integer to get access to that static
    // function because Closure doesn't yet support module circular references.
    return this.m_getClass().m_getName() + '@' + this.m_hashCode();
  }

  /**
   * @return {string}
   * @public
   */
  toString() {
    return String(this.$javaToString());
  }

  /**
   * Returns whether the provided instance is an instance of this class.
   * @param {*} instance
   * @return {boolean}
   * @public
   */
  static $isInstance(instance) {
    return true;
  }

  /**
   * Returns whether the provided class is or extends this class.
   * @param {Function} classConstructor
   * @return {boolean}
   * @public
   */
  static $isAssignableFrom(classConstructor) {
    return true;
  }

  /**
   * Runs inline static field initializers.
   * @protected
   */
  static $clinit() {
    Class = goog.module.get('gen.java.lang.Class$impl');
  }
};


$Util.$setClassMetadata(Object, 'java.lang.Object');


/**
 * Exported class.
 */
exports = Object;
