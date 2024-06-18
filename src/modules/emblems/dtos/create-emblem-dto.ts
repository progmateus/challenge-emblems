import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

abstract class ICreateEmblemDTO {
  @ApiProperty()
  @MinLength(3, {
    message: 'Name min 3 characters',
  })
  @MaxLength(80, {
    message: 'Name max 80 characters',
  })
  Name: string;

  Slug?: string;

  @ApiProperty()
  Image?: string;
}

export { ICreateEmblemDTO };
