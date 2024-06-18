import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Max, MinLength } from 'class-validator';

abstract class ICreateUserDTO {
  @ApiProperty()
  @MinLength(3, { message: 'Name min 3 characters' })
  @Max(80, { message: 'Name max 80 characters' })
  Name: string;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsStrongPassword()
  Password: string;
}

export { ICreateUserDTO };
