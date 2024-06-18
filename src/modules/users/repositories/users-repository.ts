import { PrismaService } from 'src/database/prisma.service';
import { ICreateUserDTO } from '../dtos/create-user-dto';
import { IUsersRepository } from './contracts/iusers-repository';
import { User } from '../entites/user';
import { Injectable } from '@nestjs/common';

@Injectable()
class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async findByEmail(Email: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        Email,
      },
    });
  }
  async create({ Name, Email, Password }: ICreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        Name,
        Email,
        Password,
      },
    });
  }
}

export { UsersRepository };
