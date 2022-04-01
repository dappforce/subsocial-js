import fs from 'fs'
import { typesBundle }  from '@subsocial/definitions';

fs.writeFileSync('packages/types/src/substrate/typesBundle.json', JSON.stringify(typesBundle))
