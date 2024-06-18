import { Either, right } from 'src/modules/shared/types/either';
import { IListEmblemsQuery } from '../dtos/emblem-query-dto';
import { IEmblemsrepository } from '../repositories/contracts/iemblems-repository';
import { Injectable } from '@nestjs/common';

type ListEmblemsUseCaseResponse = Either<null, object>;

@Injectable()
class ListEmblemsUseCase {
  constructor(private readonly emblemnsRepository: IEmblemsrepository) {}
  async handle(params: IListEmblemsQuery): Promise<ListEmblemsUseCaseResponse> {
    const { where, pagination } = params;
    const { data, pagination: paginationResponse } =
      await this.emblemnsRepository.list({
        where,
        pagination,
      });
    return right({
      emblems: data,
      pagination: paginationResponse,
    });
  }
}

export { ListEmblemsUseCase };
