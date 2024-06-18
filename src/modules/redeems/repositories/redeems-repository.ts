import { PrismaService } from 'src/database/prisma.service';
import { UsersEmblems } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IRedeemsRepository } from './contracts/iredeems-repository';

@Injectable()
class RedeemsRepository implements IRedeemsRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getOwner(userId: number): Promise<UsersEmblems[]> {
    return await this.prisma.usersEmblems.findMany({
      where: {
        UserId: userId,
      },
      include: {
        User: true,
        Emblem: true,
      },
    });
  }
  async list(emblemId: number, userId: number): Promise<UsersEmblems[]> {
    return await this.prisma.usersEmblems.findMany({
      where: {
        UserId: userId,
        EmblemId: emblemId,
      },
      include: {
        User: true,
        Emblem: true,
      },
    });
  }
  async create(emblemId: number, userId: number): Promise<void> {
    await this.prisma.usersEmblems.create({
      data: {
        EmblemId: emblemId,
        UserId: userId,
      },
    });
  }
}

export { RedeemsRepository };
