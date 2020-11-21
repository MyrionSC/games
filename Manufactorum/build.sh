#!/usr/bin/env bash

mkdir -p dist
cp -r src/assets/ dist
cp src/index.html dist
cmd.exe /C npm run build
