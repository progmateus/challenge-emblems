import { UseCaseError } from 'src/modules/shared/errors/use-case-error';

class SlugalreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Slug already exists');
  }
}

export { SlugalreadyExistsError };
