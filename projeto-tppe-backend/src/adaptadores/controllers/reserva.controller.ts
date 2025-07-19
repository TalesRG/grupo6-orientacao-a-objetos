import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ReservaServiceImpl } from '../../aplicacao/implementation/reserva.implemantation';
import { CriarReservaDto } from '../../aplicacao/service/reserva/dto/criarReserva.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaServiceImpl) {}

  @Post('cadastrar')
  async cadastrarReserva(@Body() reservaDto: CriarReservaDto) {
    return this.reservaService.criarReserva(reservaDto);
  }

  @Get('listar')
  async listarReservas() {
    return this.reservaService.listarReservas();
  }

  @Put('cancelar/:id')
  async cancelarReserva(@Param('id') id: number) {
    return this.reservaService.cancelarReserva(id);
  }

  @Put('finalizar/:id')
  async finalizarReserva(@Param('id') id: number) {
    return this.reservaService.finalizarReserva(id);
  }

  @Put('editar/:id')
  async editarReserva(
    @Param('id') id: number,
    @Body() reservaDto: CriarReservaDto,
  ) {
    return this.reservaService.editarReserva(id, reservaDto);
  }

  @Get('total/ativos')
  async totalReservasAtivas() {
    return this.reservaService.totalReservasAtivas();
  }

  @Get('receitaMensal')
  async receitaMensal() {
    return this.reservaService.retornaReceitaMensal();
  }
}
