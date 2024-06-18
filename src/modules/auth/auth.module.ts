import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from 'src/env';
import { JwtStrategy } from './jwt.strategy';
import { AuthUseCase } from './use-cases/auth-user-use-case';
import { AuthController } from './controllers/auth.controller';
import { IUsersRepository } from '../users/repositories/contracts/iusers-repository';
import { UsersRepository } from '../users/repositories/users-repository';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env>) {
        const secret = config.get('SECRET_TOKEN', { infer: true });
        return {
          secret,
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    AuthUseCase,
    PrismaService,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
