#!/bin/bash

sed -i "s/\@subsocial\/types\/substrate\/interfaces\/subsocial/\.\/interfaces\/subsocial/" ./packages/types/src/substrate/interfaceRegistry.ts
