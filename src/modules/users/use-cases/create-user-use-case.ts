import { hash } from 'bcryptjs';
import { ICreateUserDTO } from '../dtos/create-user-dto';
import { IUsersRepository } from '../repositories/contracts/iusers-repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from 'src/modules/shared/types/either';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';

type CreateUserUseCaseResponse = Either<EmailAlreadyExistsError, object>;

@Injectable()
class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async handle({
    Name,
    Email,
    Password,
  }: ICreateUserDTO): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(Email);
    if (user) {
      return left(new EmailAlreadyExistsError());
    }
    const hashedPassword = await hash(Password, 8);

    await this.usersRepository.create({
      Name,
      Email,
      Password: hashedPassword,
    });

    return right({
      message: 'User created',
    });
  }
}

export { CreateUserUseCase };
