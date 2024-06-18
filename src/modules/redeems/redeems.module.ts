import { Module } from '@nestjs/common';
import { RedeemEmblemUseCase } from './use-cases/redeem-emblem-use-case';
import { PrismaService } from 'src/database/prisma.service';
import { ListRedeemsUseCase } from './use-cases/list-redeems-use-case ';
import { RedeemsController } from './controllers/redeems.controller';
import { IEmblemsrepository } from '../emblems/repositories/contracts/iemblems-repository';
import { EmblemsRepository } from '../emblems/repositories/emblems-repository';
import { RedeemsRepository } from './repositories/redeems-repository';
import { IRedeemsRepository } from './repositories/contracts/iredeems-repository';

@Module({
  imports: [],
  controllers: [RedeemsController],
  providers: [
    PrismaService,
    RedeemEmblemUseCase,
    ListRedeemsUseCase,
    {
      provide: IEmblemsrepository,
      useClass: EmblemsRepository,
    },
    {
      provide: IRedeemsRepository,
      useClass: RedeemsRepository,
    },
  ],
})
export class RedeemsModule {}
