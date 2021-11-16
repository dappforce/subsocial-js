import fs from 'fs'
import { typesBundle, specBundle }  from '@subsocial/types/src/substrate/preparedTypes';

fs.writeFileSync('packages/types/src/substrate/specBundle.json', JSON.stringify(specBundle))
fs.writeFileSync('packages/types/src/substrate/typesBundle.json', JSON.stringify(typesBundle))
