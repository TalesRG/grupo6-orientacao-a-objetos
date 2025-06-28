import { Body, Controller, Post } from '@nestjs/common';
import { PessoaFisicaServiceImpl } from '../../aplicacao/impl/locatario/pessoaFisica.impl';
import { CriarLocatarioPessoaFisicaDto } from '../../aplicacao/service/locatario/dto/criarLocatarioPessoaFisica.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Locatario')
@Controller('locatario')
export class LocatarioController {
  constructor(private pessoaFisicaService: PessoaFisicaServiceImpl) {}

  @Post('/pessoa-fisica/cadastrar')
  async cadastrarPessoaFisica(
    @Body() pessoaFisicaDto: CriarLocatarioPessoaFisicaDto,
  ) {
    return await this.pessoaFisicaService.criarPessoaFisica(pessoaFisicaDto);
  }
}
