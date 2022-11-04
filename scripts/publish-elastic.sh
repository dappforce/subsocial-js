#!/bin/bash

cd ./packages/elasticsearch/build
cp ../package.json .
npm publish --access public 