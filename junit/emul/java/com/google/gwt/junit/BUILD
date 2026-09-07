load("@rules_java//java:defs.bzl", "java_library")

package(
    default_applicable_licenses = ["//:j2cl_license"],
    licenses = ["reciprocal"],
)

java_library(
    name = "gwttestcase_emul",
    srcs = glob(["**/*.java"]),
    visibility = ["//:__pkg__"],
    deps = [
        "//junit/emul/java:junit_emul-jdk",
    ],
)

genrule(
    name = "gwttestcase_emul_sources",
    srcs = glob(["**/*.java"]),
    outs = ["gwttestcase_emul-sources.jar"],
    cmd = """
        tmpdir=$$(mktemp -d)
        for f in $(SRCS); do
            mkdir -p $$tmpdir/$$(dirname $$f)
            cp $$f $$tmpdir/$$f
        done
        $(JAVABASE)/bin/jar cf $@ -C $$tmpdir .
        rm -rf $$tmpdir
    """,
    toolchains = ["@bazel_tools//tools/jdk:current_java_runtime"],
    visibility = ["//:__pkg__"],
)

genrule(
    name = "gwttestcase_emul_javadoc",
    srcs = [],
    outs = ["gwttestcase_emul-javadoc.jar"],
    cmd = "touch $@",
    visibility = ["//:__pkg__"],
)
