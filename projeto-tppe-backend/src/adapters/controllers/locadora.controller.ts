import { Body, Controller, Post } from '@nestjs/common';
import { LocadoraServiceImpl } from '../../aplicacao/impl/locadora/locatario.impl';
import { CriarLocadoraDto } from '../../aplicacao/service/locadora/dto/criarLocadora.dto';
import { LocadoraOrmEntity } from '../repository/locadoraOrm.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Locadora')
@Controller('locadora')
export class LocadoraController {
  constructor(private locadoraService: LocadoraServiceImpl) {}

  @Post('/cadastrar')
  async cadastrarLocadora(
    @Body() locadoraDto: CriarLocadoraDto,
  ): Promise<LocadoraOrmEntity> {
    return this.locadoraService.criarLocadora(locadoraDto);
  }
}
