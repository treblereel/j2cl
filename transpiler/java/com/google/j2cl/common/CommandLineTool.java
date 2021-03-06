/*
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package com.google.j2cl.common;

import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;

/** A base class for command line tool. */
public abstract class CommandLineTool {

  @Option(name = "-help", usage = "print this message")
  protected boolean help = false;

  private final String toolName;

  protected CommandLineTool(String toolName) {
    this.toolName = toolName;
  }

  protected abstract Problems run();

  // TODO(goktug): reduce visibility.
  protected Problems processRequest(String[] args) {
    Problems problems = new Problems();
    CmdLineParser parser = new CmdLineParser(this);

    final String usage = "Usage: " + toolName + " <options> <source files>";

    try {
      parser.parseArgument(args);
    } catch (CmdLineException e) {
      if (!this.help) {
        String message = "%s\n%s\nuse -help for a list of possible options";
        problems.error(message, e.getMessage(), usage);
        return problems;
      }
    }

    if (this.help) {
      String message = "%s\nwhere possible options include:\n%s";
      problems.info(message, usage, J2clUtils.streamToString(parser::printUsage));
      return problems;
    }

    try {
      return run();
    } catch (Problems.Exit e) {
      return e.getProblems();
    }
  }

  protected final void execute(String[] args) {
    Problems problems = this.processRequest(args);
    System.exit(problems.reportAndGetExitCode(System.err));
  }
}
