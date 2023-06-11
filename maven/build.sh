#!/usr/bin/env bash

set -e
BAZEL=${BAZEL:-bazel}

${BAZEL} build //transpiler/java/com/google/j2cl/transpiler:*

${BAZEL} build //tools/java/com/google/j2cl/tools/gwtincompatible:*
${BAZEL} build //tools/java/com/google/j2cl/tools/minifier:*

${BAZEL} build //jre/java/javaemul/internal/vmbootstrap/primitives:primitives

${BAZEL} build //jre/java/super-wasm/javaemul/internal/wasmarray:wasmarray

${BAZEL} build //transpiler/java/com/google/j2cl/common:*
${BAZEL} build //transpiler/java/com/google/j2cl/common/visitor:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/ast:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/frontend/common:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/frontend/jdt:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/frontend/javac:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/frontend:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/passes:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/backend:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/backend/common:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/backend/libraryinfo:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/backend/closure:*
${BAZEL} build //transpiler/java/com/google/j2cl/transpiler/backend/wasm:*
${BAZEL} build //jre/java:javaemul_internal_annotations
${BAZEL} build //jre/java:javaemul_internal_annotations-j2cl
${BAZEL} build //jre/java:javaemul_internal_annotations-j2wasm
${BAZEL} build //jre/java:jre.js
${BAZEL} build //jre/java:jre

${BAZEL} build //junit/emul/java:*
${BAZEL} build //jre/javatests/com/google/gwt/junit:*
${BAZEL} build  //junit/generator/java/com/google/j2cl/junit/async:*
${BAZEL} build //junit/generator/java/com/google/j2cl/junit/apt:*

#${BAZEL} build @org_gwtproject_gwt//user:libgwt-javaemul-internal-annotations.jar
#${BAZEL} build @org_gwtproject_gwt//user:libgwt-javaemul-internal-annotations-src.jar


# This must be the last line, or else some other operation will apparently remove these
# soft links that we rely on in the maven build
${BAZEL} build //third_party:jdt-core
