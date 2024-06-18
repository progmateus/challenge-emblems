import { Injectable } from '@nestjs/common';
import { UsersEmblems } from '@prisma/client';

@Injectable()
abstract class IRedeemsRepository {
  abstract list(emblemId: number, userId: number): Promise<UsersEmblems[]>;
  abstract create(emblemId: number, userId: number): Promise<void>;
  abstract getOwner(userId: number): Promise<UsersEmblems[]>;
}

export { IRedeemsRepository };
