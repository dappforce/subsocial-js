#!/bin/bash

npmrc -c subsocial

npm config set registry https://registry.npmjs.com/

npm login --scope=@subsocial