/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleFileExtensions: [ ...config.moduleFileExtensions, 'd.ts' ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'empty/object',
    '\\.(css|less)$': 'empty/object'
  }
});
