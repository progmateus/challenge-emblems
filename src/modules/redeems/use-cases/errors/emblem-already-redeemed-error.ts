import { UseCaseError } from 'src/modules/shared/errors/use-case-error';

class EblemAlreadyredeemedError extends Error implements UseCaseError {
  constructor() {
    super('This embleem has already been redeemed');
  }
}

export { EblemAlreadyredeemedError };
