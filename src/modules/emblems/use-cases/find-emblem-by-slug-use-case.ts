import { Either, right } from 'src/modules/shared/types/either';
import { IEmblemsrepository } from '../repositories/contracts/iemblems-repository';
import { Injectable } from '@nestjs/common';

type ListEmblemsUseCaseResponse = Either<null, object>;

@Injectable()
class FindEmblemBySlugUseCase {
  constructor(private readonly emblemnsRepository: IEmblemsrepository) {}
  async handle(slug: string): Promise<ListEmblemsUseCaseResponse> {
    const emblem = await this.emblemnsRepository.findBySlug(slug);
    return right({
      emblem,
    });
  }
}

export { FindEmblemBySlugUseCase };
