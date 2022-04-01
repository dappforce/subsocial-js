#!/bin/bash

cd ./packages/definitions/build
cp ../package.json .
npm publish --access public 