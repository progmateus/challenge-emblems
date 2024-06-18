import { UseCaseError } from './use-case-error';

class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found');
  }
}

export { ResourceNotFoundError };
