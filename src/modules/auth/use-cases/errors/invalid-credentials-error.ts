import { UseCaseError } from 'src/modules/shared/errors/use-case-error';

class InvalidCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials');
  }
}

export { InvalidCredentialsError };
