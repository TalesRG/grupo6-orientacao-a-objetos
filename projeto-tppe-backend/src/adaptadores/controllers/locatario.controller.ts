import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriarLocatarioDto } from '../../aplicacao/service/locatario/dto/criarLocatario.dto';
import { LocatarioServiceImpl } from '../../aplicacao/implementation/locatario.implematation';
@ApiTags('Locatario')
@Controller('locatario')
export class LocatarioController {
  constructor(private locatarioService: LocatarioServiceImpl) {}

  @Post('/cadastrar')
  async cadastrarLocatario(@Body() locatarioDto: CriarLocatarioDto) {
    return await this.locatarioService.criarLocatario(locatarioDto);
  }

  @Get('/listar')
  async listarLocatarios() {
    return await this.locatarioService.listarLocatarios();
  }

  @Get('/total/ativos')
  async retornaTotadeLocatarios() {
    return await this.locatarioService.totalLocatarios();
  }
}
