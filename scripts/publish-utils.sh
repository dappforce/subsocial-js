#!/bin/bash

yarn build
cd ./packages/utils/build
npm publish --access public