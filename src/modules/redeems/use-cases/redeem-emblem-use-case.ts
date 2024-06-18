import { Either, left, right } from 'src/modules/shared/types/either';
import { IRedeemsRepository } from '../repositories/contracts/iredeems-repository';
import { Injectable } from '@nestjs/common';
import { IEmblemsrepository } from 'src/modules/emblems/repositories/contracts/iemblems-repository';
import { EmblemNotFoundError } from 'src/modules/emblems/use-cases/errors/emblem-not-found-error';
import { EblemAlreadyredeemedError } from './errors/emblem-already-redeemed-error';

type RedeemEmblemUseCaseResponse = Either<EblemAlreadyredeemedError, object>;

@Injectable()
class RedeemEmblemUseCase {
  constructor(
    private readonly emblemsRepository: IEmblemsrepository,
    private readonly redeemsrepository: IRedeemsRepository,
  ) {}
  async handle(
    emblemId: number,
    userId: number,
  ): Promise<RedeemEmblemUseCaseResponse> {
    const emblem = await this.emblemsRepository.findById(+emblemId);

    if (!emblem) {
      return left(new EmblemNotFoundError());
    }

    const redeems = await this.redeemsrepository.list(emblemId, userId);

    if (redeems && redeems.length > 0) {
      return left(new EblemAlreadyredeemedError());
    }
    await this.redeemsrepository.create(emblemId, userId);
    return right({
      message: 'Emblem redeemed',
    });
  }
}

export { RedeemEmblemUseCase };
