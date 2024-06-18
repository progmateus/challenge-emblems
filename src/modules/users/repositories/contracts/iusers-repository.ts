import { Injectable } from '@nestjs/common';
import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../entites/user';

@Injectable()
abstract class IUsersRepository {
  abstract create(data: ICreateUserDTO): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
