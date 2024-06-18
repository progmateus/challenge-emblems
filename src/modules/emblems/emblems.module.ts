import { Module } from '@nestjs/common';
import { IEmblemsrepository } from './repositories/contracts/iemblems-repository';
import { EmblemsRepository } from './repositories/emblems-repository';
import { ListEmblemsUseCase } from './use-cases/list-emblems-use-case';
import { EmblemsController } from './controllers/emblems.controller';
import { FindEmblemBySlugUseCase } from './use-cases/find-emblem-by-slug-use-case';
import { PrismaService } from 'src/database/prisma.service';
import { CreateEmblemUseCase } from './use-cases/create-emblem-use-case';

@Module({
  imports: [],
  controllers: [EmblemsController],
  providers: [
    PrismaService,
    ListEmblemsUseCase,
    FindEmblemBySlugUseCase,
    CreateEmblemUseCase,
    {
      provide: IEmblemsrepository,
      useClass: EmblemsRepository,
    },
  ],
})
export class EmblemsModule {}
