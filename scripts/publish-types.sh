#!/bin/bash

yarn build
cd ./packages/types/build
npm publish --access public