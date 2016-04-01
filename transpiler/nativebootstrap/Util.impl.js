/**
 * Impl hand rolled.
 */
goog.module('nativebootstrap.Util$impl');


/**
 * Miscellaneous utility functions.
 */
class Util {
  /**
   * Generates and returns a unique id from a String.
   *
   * Closure compiler can optionally replace this function with
   * some other strategy.
   *
   * @param {string} id
   * @return {string}
   * @public
   */
  static $generateId(id) { return id; }

  /**
   * @param {*} ctor
   * @param {string} name
   * @public
   */
  static $setClassMetadata(ctor, name) {
    ctor.prototype.$$classMetadata = [name, Util.ClassType.CLASS];
  }

  /**
   * @param {*} ctor
   * @param {string} name
   * @public
   */
  static $setClassMetadataForInterface(ctor, name) {
    ctor.prototype.$$classMetadata = [name, Util.ClassType.INTERFACE];
  }

  /**
   * @param {*} ctor
   * @param {string} name
   * @public
   */
  static $setClassMetadataForEnum(ctor, name) {
    ctor.prototype.$$classMetadata = [name, Util.ClassType.ENUM];
  }

  /**
   * @param {*} ctor
   * @param {string} name
   * @public
   */
  static $setClassMetadataForPrimitive(ctor, name) {
    ctor.prototype.$$classMetadata = [name, Util.ClassType.PRIMITIVE];
  }

  /**
   * @param {*} ctor
   * @return {string}
   * @public
   */
  static $extractClassName(ctor) {
    if (CLASS_METADATA_ENABLED_) {
      return ctor.prototype.$$classMetadata[0];
    } else {
      // TODO(goktug): use uniq ID
      return 'Class$obf';
    }
  }

  /**
   * @param {*} ctor
   * @return {Util.ClassType}
   * @public
   */
  static $extractClassType(ctor) {
    if (CLASS_METADATA_ENABLED_) {
      return ctor.prototype.$$classMetadata[1];
    } else {
      return Util.ClassType.CLASS;
    }
  }

  /**
   * Returns whether the "from" class can be cast to the "to" class.
   *
   * Unlike instanceof, this function operates on classes instead of
   * instances.
   * @param {Function} fromClass
   * @param {Function} toClass
   * @return {boolean}
   * @public
   */
  static $canCastClass(fromClass, toClass) {
    return (fromClass != null &&
        (fromClass == toClass || fromClass.prototype instanceof toClass));
  }

  /**
   * Create a function that applies the specified jsFunctionMethod on itself,
   * and copies {@code instance}' properties to itself.
   *
   * @param {Function} jsFunctionMethod
   * @param {*} instance
   * @param {Function} copyMethod
   * @return {!Function}
   * @public
   */
  static $makeLambdaFunction(jsFunctionMethod, instance, copyMethod) {
    var lambda = function() {
      return jsFunctionMethod.apply(lambda, arguments);
    };
    copyMethod(instance, lambda);
    return lambda;
  }

  /**
   * Runs inline static field initializers.
   * @public
   */
  static $clinit() {}
}


/**
 * Used to store qualifier that is potentially side effecting.
 * @public {*}
 */
Util.$q = null;


/**
 * @define {boolean} Whether or not to keep getName() and getCanonicalName()
 *         accurate.
 * @private
 */
goog.define('CLASS_METADATA_ENABLED_', true);


/**
 * @enum {number}
 */
Util.ClassType = {
  CLASS: 0,
  INTERFACE: 1,
  ENUM: 2,
  PRIMITIVE: 3
};


/**
 * Exported class.
 */
exports = Util;
