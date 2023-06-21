/*
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vertispan.j2cl.wasm;

import elemental2.core.ArrayBuffer;
import elemental2.core.ArrayBufferView;
import elemental2.core.Function;
import elemental2.dom.Response;
import elemental2.promise.Promise;
import elemental2.webassembly.webassembly.Instance;
import jsinterop.annotations.JsMethod;
import jsinterop.annotations.JsOverlay;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsType;
import jsinterop.base.Js;
import jsinterop.base.JsPropertyMap;

public class J2wasm {
    @JsType(isNative = true, name = "?", namespace = JsPackage.GLOBAL)
    public interface InstantiateBlockingModuleObjectUnionType {
        @JsOverlay
        static InstantiateBlockingModuleObjectUnionType of(Object o) {
            return Js.cast(o);
        }

        @JsOverlay
        default ArrayBuffer asArrayBuffer() {
            return Js.cast(this);
        }

        @JsOverlay
        default ArrayBufferView asArrayBufferView() {
            return Js.cast(this);
        }

        @JsOverlay
        default boolean isArrayBuffer() {
            return (Object) this instanceof ArrayBuffer;
        }

        @JsOverlay
        default boolean isArrayBufferView() {
            return (Object) this instanceof ArrayBufferView;
        }
    }

    @JsType(isNative = true, name = "?", namespace = JsPackage.GLOBAL)
    public interface InstantiateBlockingOverridingImportsModuleObjectUnionType {
        @JsOverlay
        static InstantiateBlockingOverridingImportsModuleObjectUnionType of(Object o) {
            return Js.cast(o);
        }

        @JsOverlay
        default ArrayBuffer asArrayBuffer() {
            return Js.cast(this);
        }

        @JsOverlay
        default ArrayBufferView asArrayBufferView() {
            return Js.cast(this);
        }

        @JsOverlay
        default boolean isArrayBuffer() {
            return (Object) this instanceof ArrayBuffer;
        }

        @JsOverlay
        default boolean isArrayBufferView() {
            return (Object) this instanceof ArrayBufferView;
        }
    }

    @JsType(isNative = true, name = "?", namespace = JsPackage.GLOBAL)
    public interface InstantiateStreamingOverridingImportsUrlOrResponseUnionType {
        @JsOverlay
        static InstantiateStreamingOverridingImportsUrlOrResponseUnionType of(Object o) {
            return Js.cast(o);
        }

        @JsOverlay
        default Promise<Response> asPromise() {
            return Js.cast(this);
        }

        @JsOverlay
        default String asString() {
            return Js.asString(this);
        }

        @JsOverlay
        default boolean isPromise() {
            return (Object) this instanceof Promise;
        }

        @JsOverlay
        default boolean isString() {
            return (Object) this instanceof String;
        }
    }

    @JsType(isNative = true, name = "?", namespace = JsPackage.GLOBAL)
    public interface InstantiateStreamingUrlOrResponseUnionType {
        @JsOverlay
        static InstantiateStreamingUrlOrResponseUnionType of(Object o) {
            return Js.cast(o);
        }

        @JsOverlay
        default Promise<Response> asPromise() {
            return Js.cast(this);
        }

        @JsOverlay
        default String asString() {
            return Js.asString(this);
        }

        @JsOverlay
        default boolean isPromise() {
            return (Object) this instanceof Promise;
        }

        @JsOverlay
        default boolean isString() {
            return (Object) this instanceof String;
        }
    }

    @JsMethod(namespace = "j2wasm")
    public static native JsPropertyMap<Function> createImportObject(
            JsPropertyMap<Function> userImports);

    @JsMethod(namespace = "j2wasm")
    public static native Instance instantiateBlocking(
            InstantiateBlockingModuleObjectUnionType moduleObject,
            JsPropertyMap<Function> userImports);

    @JsMethod(namespace = "j2wasm")
    public static native Instance instantiateBlocking(
            InstantiateBlockingModuleObjectUnionType moduleObject);

    @JsMethod(namespace = "j2wasm")
    public static native Instance instantiateBlockingOverridingImports(
            InstantiateBlockingOverridingImportsModuleObjectUnionType moduleObject,
            JsPropertyMap<Function> imports);

    @JsMethod(namespace = "j2wasm")
    public static native Instance instantiateBlockingOverridingImports(
            InstantiateBlockingOverridingImportsModuleObjectUnionType moduleObject);

    @JsMethod(namespace = "j2wasm")
    public static native Promise<Instance> instantiateStreaming(
            InstantiateStreamingUrlOrResponseUnionType urlOrResponse,
            JsPropertyMap<Function> userImports);

    @JsMethod(namespace = "j2wasm")
    public static native Promise<Instance> instantiateStreaming(
            InstantiateStreamingUrlOrResponseUnionType urlOrResponse);

    @JsMethod(namespace = "j2wasm")
    public static native Promise<Instance> instantiateStreamingOverridingImports(
            InstantiateStreamingOverridingImportsUrlOrResponseUnionType urlOrResponse,
            JsPropertyMap<Function> imports);

    @JsMethod(namespace = "j2wasm")
    public static native Promise<Instance> instantiateStreamingOverridingImports(
            InstantiateStreamingOverridingImportsUrlOrResponseUnionType urlOrResponse);

}
