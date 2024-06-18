import { Injectable } from '@nestjs/common';
import { ICreateEmblemDTO } from '../../dtos/create-emblem-dto';
import { Emblem } from '../../entities/Emblem';
import { IListEmblemsQuery } from '../../dtos/emblem-query-dto';
import { PaginatedResult } from 'src/modules/shared/dtos/pagination-result-dto';

@Injectable()
abstract class IEmblemsrepository {
  abstract findById(id: number): Promise<Emblem>;
  abstract create(data: ICreateEmblemDTO): Promise<void>;
  abstract list(params: IListEmblemsQuery): Promise<PaginatedResult<Emblem>>;
  abstract findBySlug(slug: string): Promise<Emblem>;
}

export { IEmblemsrepository };
