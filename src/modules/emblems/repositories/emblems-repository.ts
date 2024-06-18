import { PrismaService } from 'src/database/prisma.service';
import { ICreateEmblemDTO } from '../dtos/create-emblem-dto';
import { IEmblemsrepository } from './contracts/iemblems-repository';
import { IListEmblemsQuery } from '../dtos/emblem-query-dto';
import { Emblem } from '../entities/Emblem';
import { PaginatedResult } from 'src/modules/shared/dtos/pagination-result-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
class EmblemsRepository implements IEmblemsrepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: number): Promise<Emblem> {
    return await this.prisma.emblem.findUnique({
      where: {
        Id: id,
      },
    });
  }
  async list(params: IListEmblemsQuery): Promise<PaginatedResult<Emblem>> {
    const [emblems, count] = await this.prisma.$transaction([
      this.prisma.emblem.findMany({ where: params.where }),
      this.prisma.emblem.count({ where: params.where }),
    ]);
    return {
      data: emblems,
      pagination: {
        total: count,
      },
    };
  }
  async create({ Name, Slug, Image }: ICreateEmblemDTO): Promise<void> {
    await this.prisma.emblem.create({
      data: {
        Name,
        Slug,
        Image,
      },
    });
  }

  async findBySlug(slug: string): Promise<Emblem> {
    return await this.prisma.emblem.findFirst({
      where: {
        Slug: slug,
      },
    });
  }
}

export { EmblemsRepository };
