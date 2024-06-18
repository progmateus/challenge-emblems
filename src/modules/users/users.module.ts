import { Module } from '@nestjs/common';
import { IUsersRepository } from './repositories/contracts/iusers-repository';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user-use-case';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    PrismaService,
  ],
})
export class UsersModule {}
