#!/bin/bash

cd ./packages/types/build
cp ../package.json .
npm publish --access public --tag moderation