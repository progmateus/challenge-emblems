import { UseCaseError } from 'src/modules/shared/errors/use-case-error';

class EmailAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Email already exists');
  }
}

export { EmailAlreadyExistsError };
