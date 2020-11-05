#!/bin/bash

cd ./packages/api/build
cp ../package.json .
npm publish --access public