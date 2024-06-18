import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { ICreateUserDTO } from '../dtos/create-user-dto';
import { CreateUserUseCase } from '../use-cases/create-user-use-case';
import { EmailAlreadyExistsError } from '../use-cases/errors/email-already-exists-error';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async list(@Body() body: ICreateUserDTO) {
    const { Name, Email, Password } = body;
    const result = await this.createUserUseCase.handle({
      Name,
      Email,
      Password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case EmailAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    return result.value;
  }
}
