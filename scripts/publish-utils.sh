#!/bin/bash

cd ./packages/utils/build
cp ../package.json .
npm publish --access public --tag moderation