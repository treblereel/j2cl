/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.j2cl.transpiler.readable.trywithresource;

public class TryWithResource {
  static class ClosableThing implements AutoCloseable {
    @Override
    public void close() {}
  }

  public static void tryWithResource() {
    try (ClosableThing thing = new ClosableThing()) {
      int i = 0;
    }
  }

  public static void tryWithResourceMultipleResources(String[] args) {
    try (ClosableThing thing = new ClosableThing(); ClosableThing thing2 = new ClosableThing()) {
      int i = 0;
      throw new Exception();
    } catch (Exception e) {
      int b = 10;
    }
  }
}