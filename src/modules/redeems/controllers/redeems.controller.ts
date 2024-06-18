import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RedeemEmblemUseCase } from '../use-cases/redeem-emblem-use-case';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/auth/current-user-decorator';
import { ListRedeemsUseCase } from '../use-cases/list-redeems-use-case ';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { EmblemNotFoundError } from 'src/modules/emblems/use-cases/errors/emblem-not-found-error';

@Controller('redeems')
export class RedeemsController {
  constructor(
    private readonly redeemEmblemUseCase: RedeemEmblemUseCase,
    private readonly listRedeemsUseCase: ListRedeemsUseCase,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'emblemId',
    required: true,
    schema: { type: 'integer' },
  })
  @ApiBearerAuth()
  @Post(':emblemId')
  async reedem(@Param() params: any, @User() user: any) {
    const { emblemId } = params;
    const { id: userId } = user;
    const result = await this.redeemEmblemUseCase.handle(+emblemId, +userId);

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case EmblemNotFoundError:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
    return result.value;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async listRedeems(@User() user: any) {
    const { id } = user;
    const result = await this.listRedeemsUseCase.handle(+id);

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
    return result.value;
  }
}
