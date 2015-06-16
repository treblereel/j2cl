/*
 * Copyright 2015 Google Inc.
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
package com.google.j2cl.ast;

import com.google.auto.value.AutoValue;
import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;

import java.util.Collections;

/**
 * A (by name) reference to a class.
 */
@AutoValue
public abstract class RegularTypeReference implements TypeReference {
  public static RegularTypeReference create(
      Iterable<String> packageComponents,
      Iterable<String> classComponents,
      String compilationUnitSimpleName) {
    return new AutoValue_RegularTypeReference(
        ImmutableList.copyOf(packageComponents),
        ImmutableList.copyOf(classComponents),
        compilationUnitSimpleName);
  }

  public abstract ImmutableList<String> getPackageComponents();

  public abstract ImmutableList<String> getClassComponents();

  public abstract String getCompilationSimpleName();

  @Override
  public String getSimpleName() {
    return Iterables.getLast(getClassComponents());
  }

  @Override
  public String getBinaryName() {
    return Joiner.on(".")
        .join(
            Iterables.concat(
                getPackageComponents(),
                Collections.singleton(Joiner.on("$").join(getClassComponents()))));
  }

  @Override
  public String getCompilationUnitSourceName() {
    return Joiner.on(".").join(getPackageComponents()) + "." + getCompilationSimpleName();
  }

  @Override
  public String getSourceName() {
    return Joiner.on(".").join(Iterables.concat(getPackageComponents(), getClassComponents()));
  }

  @Override
  public String getPackageName() {
    return Joiner.on(".").join(getPackageComponents());
  }

  public ArrayTypeReference getArray(int dimensions) {
    return new AutoValue_ArrayTypeReference(dimensions, this);
  }

  @Override
  public boolean isArray() {
    return false;
  }

  @Override
  public int getDimensions() {
    return 0;
  }

  @Override
  public TypeReference getLeafType() {
    return null;
  }
}
