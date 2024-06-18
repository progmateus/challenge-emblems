import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

abstract class ISignInDTO {
  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  Password: string;
}

export { ISignInDTO };
