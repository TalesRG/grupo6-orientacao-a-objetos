import { Body, Controller, Post } from '@nestjs/common';
import { PessoaFisicaServiceImpl } from '../../aplicacao/impl/locatario/pessoaFisica.impl';
import { CriarLocatarioPessoaFisicaDto } from '../../aplicacao/service/locatario/dto/criarLocatarioPessoaFisica.dto';
import { ApiTags } from '@nestjs/swagger';
import { PessoaJuridicaServiceImpl } from '../../aplicacao/impl/locatario/pessoaJuridica.impl';
import { CriarLocatarioPessoaJuridicaDto } from '../../aplicacao/service/locatario/dto/criarLocatarioPessoaJuridica.dto';
@ApiTags('Locatario')
@Controller('locatario')
export class LocatarioController {
  constructor(
    private pessoaFisicaService: PessoaFisicaServiceImpl,
    private pessoaJuridicaService: PessoaJuridicaServiceImpl,
  ) {}

  @Post('/pessoa-fisica/cadastrar')
  async cadastrarPessoaFisica(
    @Body() pessoaFisicaDto: CriarLocatarioPessoaFisicaDto,
  ) {
    return await this.pessoaFisicaService.criarPessoaFisica(pessoaFisicaDto);
  }

  @Post('/pessoa-juridica/cadastrar')
  async cadastrarPessoaJuridica(
    @Body() pessoaJuridicaDto: CriarLocatarioPessoaJuridicaDto,
  ) {
    return await this.pessoaJuridicaService.criarPessoaJuridica(
      pessoaJuridicaDto,
    );
  }
}
