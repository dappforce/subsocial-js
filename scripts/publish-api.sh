#!/bin/bash

yarn build
cd ./packages/api/build
npm publish --access public