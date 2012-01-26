#!/bin/bash
java -jar /opt/closure-compiler/compiler.jar --js ../src/JSLifeConfiguration.js ../src/JSLifeCore.js --js_output_file jslife-min.js
