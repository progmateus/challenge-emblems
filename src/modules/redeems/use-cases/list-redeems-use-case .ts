import { Either, right } from 'src/modules/shared/types/either';
import { Injectable } from '@nestjs/common';
import { EblemAlreadyredeemedError } from './errors/emblem-already-redeemed-error';
import { IRedeemsRepository } from '../repositories/contracts/iredeems-repository';

type RedeemEmblemUseCaseResponse = Either<EblemAlreadyredeemedError, object>;

@Injectable()
class ListRedeemsUseCase {
  constructor(private readonly redeemsRepository: IRedeemsRepository) {}
  async handle(userId: number): Promise<RedeemEmblemUseCaseResponse> {
    const redeems = await this.redeemsRepository.getOwner(userId);

    return right({ redeems });
  }
}

export { ListRedeemsUseCase };
