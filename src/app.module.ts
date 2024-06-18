import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { EmblemsModule } from './modules/emblems/emblems.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedeemsModule } from './modules/redeems/redeems.module';

@Module({
  imports: [
    UsersModule,
    EmblemsModule,
    AuthModule,
    RedeemsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
