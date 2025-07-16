import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ReservaServiceImpl } from '../../aplicacao/implementation/reserva.implemantation';
import { CriarReservaDto } from '../../aplicacao/service/reserva/dto/criarReserva.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaServiceImpl) {}

  @Post('cadastrar')
  cadastrarReserva(@Body() reservaDto: CriarReservaDto) {
    return this.reservaService.criarReserva(reservaDto);
  }

  @Get('listar')
  listarReservas() {
    return this.reservaService.listarReservas();
  }

  @Put('cancelar/:id')
  cancelarReserva(@Body('id') id: number) {
    return this.reservaService.cancelarReserva(id);
  }

  @Put('editar/:id')
  editarReserva(@Body('id') id: number, @Body() reservaDto: CriarReservaDto) {
    return this.reservaService.editarReserva(id, reservaDto);
  }
}
