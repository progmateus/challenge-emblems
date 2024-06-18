import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ListEmblemsUseCase } from '../use-cases/list-emblems-use-case';
import { IListEmblemsQuery } from '../dtos/emblem-query-dto';
import { FindEmblemBySlugUseCase } from '../use-cases/find-emblem-by-slug-use-case';
import { ApiParam } from '@nestjs/swagger';
import { ICreateEmblemDTO } from '../dtos/create-emblem-dto';
import { CreateEmblemUseCase } from '../use-cases/create-emblem-use-case';
import { SlugalreadyExistsError } from '../use-cases/errors/slug-already-exists-error';

@Controller('emblems')
export class EmblemsController {
  constructor(
    private readonly listEmblemsUseCase: ListEmblemsUseCase,
    private readonly findemblemBySlugUseCase: FindEmblemBySlugUseCase,
    private readonly createEmblemUseCase: CreateEmblemUseCase,
  ) {}

  @Post()
  async create(@Body() body: ICreateEmblemDTO) {
    const { Name, Image } = body;
    const result = await this.createEmblemUseCase.handle({ Name, Image });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case SlugalreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    return result.value;
  }

  @Get()
  async list(@Query() params: IListEmblemsQuery) {
    const { where, pagination } = params;
    const result = await this.listEmblemsUseCase.handle({ where, pagination });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
    return result.value;
  }

  @ApiParam({
    name: 'slug',
    required: true,
    schema: { type: 'string' },
  })
  @Get(':slug')
  async get(@Param() params: any) {
    const { slug } = params;
    const result = await this.findemblemBySlugUseCase.handle(slug);

    if (result.isLeft()) {
      throw new BadRequestException();
    }
    return result.value;
  }
}
