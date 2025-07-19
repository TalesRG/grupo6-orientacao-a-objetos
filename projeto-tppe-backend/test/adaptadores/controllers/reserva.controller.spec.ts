import { Test, TestingModule } from '@nestjs/testing';
import { ReservaController } from '../../../src/adaptadores/controllers/reserva.controller';
import { ReservaServiceImpl } from '../../../src/aplicacao/implementation/reserva.implemantation';
import { CriarReservaDto } from '../../../src/aplicacao/service/reserva/dto/criarReserva.dto';

describe('ReservaController', () => {
  let controller: ReservaController;
  let service: ReservaServiceImpl;

  const mockReservaService = {
    criarReserva: jest.fn(),
    listarReservas: jest.fn(),
    cancelarReserva: jest.fn(),
    finalizarReserva: jest.fn(),
    editarReserva: jest.fn(),
    totalReservasAtivas: jest.fn(),
    retornaReceitaMensal: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaController],
      providers: [
        {
          provide: ReservaServiceImpl,
          useValue: mockReservaService,
        },
      ],
    }).compile();

    controller = module.get<ReservaController>(ReservaController);
    service = module.get<ReservaServiceImpl>(ReservaServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const dto: CriarReservaDto = {
    locatario: 'João',
    locadora: 'Locadora A',
    veiculo: 'Carro XYZ',
    dataInicio: '2025-10-01',
    dataFim: '2025-10-05',
    valorBase: 500,
    seguros: ['Roubo', 'Danos Terceiros'],
    valorTotal: 600,
    status: 'Ativa',
  };

  it('should call criarReserva with the correct DTO', async () => {
    const result = { id: 1, ...dto };
    mockReservaService.criarReserva.mockResolvedValue(result);

    const response = await controller.cadastrarReserva(dto);

    expect(response).toEqual(result);
    expect(mockReservaService.criarReserva).toHaveBeenCalledWith(dto);
  });

  it('should return a list of reservas', async () => {
    const result = [{ id: 1, locatario: 'João' }];
    mockReservaService.listarReservas.mockResolvedValue(result);

    const response = await controller.listarReservas();

    expect(response).toEqual(result);
    expect(mockReservaService.listarReservas).toHaveBeenCalled();
  });

  it('should call cancelarReserva with the correct id', async () => {
    const result = { success: true };
    mockReservaService.cancelarReserva.mockResolvedValue(result);

    const response = await controller.cancelarReserva(1);

    expect(response).toEqual(result);
    expect(mockReservaService.cancelarReserva).toHaveBeenCalledWith(1);
  });

  it('should call finalizarReserva with the correct id', async () => {
    const result = { success: true };
    mockReservaService.finalizarReserva.mockResolvedValue(result);

    const response = await controller.finalizarReserva(1);

    expect(response).toEqual(result);
    expect(mockReservaService.finalizarReserva).toHaveBeenCalledWith(1);
  });

  it('should call editarReserva with correct id and dto', async () => {
    const result = { id: 1, ...dto };
    mockReservaService.editarReserva.mockResolvedValue(result);

    const response = await controller.editarReserva(1, dto);

    expect(response).toEqual(result);
    expect(mockReservaService.editarReserva).toHaveBeenCalledWith(1, dto);
  });

  it('should return total reservas ativas', async () => {
    const total = 10;
    mockReservaService.totalReservasAtivas.mockResolvedValue(total);

    const response = await controller.totalReservasAtivas();

    expect(response).toEqual(total);
    expect(mockReservaService.totalReservasAtivas).toHaveBeenCalled();
  });

  it('should return receita mensal', async () => {
    const receita = 8000;
    mockReservaService.retornaReceitaMensal.mockResolvedValue(receita);

    const response = await controller.receitaMensal();

    expect(response).toEqual(receita);
    expect(mockReservaService.retornaReceitaMensal).toHaveBeenCalled();
  });
});
