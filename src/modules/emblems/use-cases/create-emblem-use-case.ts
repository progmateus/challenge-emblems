import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/modules/shared/types/either';
import { ICreateEmblemDTO } from '../dtos/create-emblem-dto';
import { IEmblemsrepository } from '../repositories/contracts/iemblems-repository';
import { slugify } from '../helpers/slugfy';
import { SlugalreadyExistsError } from './errors/slug-already-exists-error';

type CreateEmblemUseCaseResponse = Either<SlugalreadyExistsError, object>;

@Injectable()
class CreateEmblemUseCase {
  constructor(private emblemsRepository: IEmblemsrepository) {}
  async handle({
    Name,
    Image,
  }: ICreateEmblemDTO): Promise<CreateEmblemUseCaseResponse> {
    const emblem = await this.emblemsRepository.findBySlug(slugify(Name));

    if (emblem) {
      return left(new SlugalreadyExistsError());
    }

    await this.emblemsRepository.create({
      Name,
      Slug: slugify(Name),
      Image,
    });

    return right({
      message: 'Emblem created',
    });
  }
}

export { CreateEmblemUseCase };
