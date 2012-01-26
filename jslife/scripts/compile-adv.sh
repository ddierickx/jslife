#!/bin/bash
java -jar /opt/closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js ../src/JSLifeConfiguration.js ../src/JSLifeCore.js --js_output_file jslife-min.js
