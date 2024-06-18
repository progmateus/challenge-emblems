import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Either, left, right } from 'src/modules/shared/types/either';
import { IUsersRepository } from 'src/modules/users/repositories/contracts/iusers-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { Injectable } from '@nestjs/common';
import { ISignInDTO } from '../dtos/sign-in-dto';

@Injectable()
class AuthUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private jwt: JwtService,
  ) {}
  async handle({
    Email,
    Password,
  }: ISignInDTO): Promise<Either<InvalidCredentialsError, object>> {
    const user = await this.usersRepository.findByEmail(Email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordMatch = await compare(Password, user.Password);

    if (!isPasswordMatch) {
      return left(new InvalidCredentialsError());
    }

    const accessToken = this.jwt.sign({
      sub: user.Id,
    });

    return right({ accessToken });
  }
}

export { AuthUseCase };
