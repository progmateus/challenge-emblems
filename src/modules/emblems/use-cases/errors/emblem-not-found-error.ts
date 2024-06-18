import { UseCaseError } from 'src/modules/shared/errors/use-case-error';

class EmblemNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Emblem not found');
  }
}

export { EmblemNotFoundError };
