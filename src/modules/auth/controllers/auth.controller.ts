import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUseCase } from '../use-cases/auth-user-use-case';
import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error';
import { ISignInDTO } from '../dtos/sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('signin')
  async signin(@Body() body: ISignInDTO) {
    const { Email, Password } = body;
    const result = await this.authUseCase.handle({
      Email,
      Password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    return result.value;
  }
}
