import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('total/ativos')
  async totalLocadoras() {
    return this.locadoraService.totalLocadoras();
  }

  @Delete('delete/:id')
  async deleteLocadora(@Param('id') id: string) {
    return this.locadoraService.deleteLocadora(id);
  }
}
