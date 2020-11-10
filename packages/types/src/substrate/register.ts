import { types } from './preparedTypes'
import { newLogger } from '@subsocial/utils';
import { registry } from './registry';

const logger = newLogger('registerSubsocialTypes')

export const registerSubsocialTypes = (): void => {
  try {
    registry.register(types);
  } catch (err) {
    logger.error('Failed to register custom types of Subsocial modules', err.stack);
  }
};

export default registerSubsocialTypes;
