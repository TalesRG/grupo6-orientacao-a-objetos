import { Body, Controller, Get, Post } from '@nestjs/common';
import { LocadoraServiceImpl } from '../../aplicacao/implementation/locadora.implematation';
import { CriarLocadoraDto } from '../../aplicacao/service/locadora/dto/criarLocadora.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Locadora')
@Controller('locadora')
export class LocadoraController {
  constructor(private locadoraService: LocadoraServiceImpl) {}

  @Post('cadastrar')
  async cadastarLocadora(@Body() criarLocatarioDto: CriarLocadoraDto) {
    return this.locadoraService.criarLocadora(criarLocatarioDto);
  }

  @Get('listar')
  async listarLocadoras() {
    return this.locadoraService.listarLocadoras();
  }
}
