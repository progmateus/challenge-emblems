import { PaginationOptions } from 'src/modules/shared/dtos/pagination-options-dto';

class IListEmblemsQuery {
  where: {
    Name: string;
  };
  pagination: PaginationOptions;
}

export { IListEmblemsQuery };
