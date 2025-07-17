import { Test, TestingModule } from '@nestjs/testing';
import { ReservaController } from '../../../src/adaptadores/controllers/reserva.controller';
import { ReservaServiceImpl } from '../../../src/aplicacao/implementation/reserva.implemantation';
import { CriarReservaDto } from '../../../src/aplicacao/service/reserva/dto/criarReserva.dto';

describe('ReservaController', () => {
  let controller: ReservaController;
  let service: ReservaServiceImpl;

  const mockService = {
    criarReserva: jest.fn(),
    listarReservas: jest.fn(),
    cancelarReserva: jest.fn(),
    editarReserva: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservaController],
      providers: [
        {
          provide: ReservaServiceImpl,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ReservaController>(ReservaController);
    service = module.get<ReservaServiceImpl>(ReservaServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve cadastrar uma nova reserva', async () => {
    const dto: CriarReservaDto = {
      locatario: 'locatario-uuid',
      locadora: 'locadora-uuid',
      veiculo: 'Civic 2023',
      dataInicio: '2025-08-01',
      dataFim: '2025-08-10',
      valorBase: 1500,
      seguros: ['básico', 'vidros'],
      valorTotal: 1800,
      status: 'Ativa',
    };

    const expectedResult = { id: 'reserva-uuid', ...dto };

    mockService.criarReserva.mockResolvedValue(expectedResult);

    const result = await controller.cadastrarReserva(dto);
    expect(result).toEqual(expectedResult);
    expect(mockService.criarReserva).toHaveBeenCalledWith(dto);
  });

  it('deve listar todas as reservas', async () => {
    const reservas = [
      { id: '1', veiculo: 'Civic', status: 'Ativa' },
      { id: '2', veiculo: 'Corolla', status: 'Cancelada' },
    ];

    mockService.listarReservas.mockResolvedValue(reservas);

    const result = await controller.listarReservas();
    expect(result).toEqual(reservas);
    expect(mockService.listarReservas).toHaveBeenCalledTimes(1);
  });

  it('deve cancelar uma reserva', async () => {
    const id = 1;
    const expectedResult = { message: 'Reserva cancelada com sucesso' };

    mockService.cancelarReserva.mockResolvedValue(expectedResult);

    const result = await controller.cancelarReserva(id);
    expect(result).toEqual(expectedResult);
    expect(mockService.cancelarReserva).toHaveBeenCalledWith(id);
  });

  it('deve editar uma reserva', async () => {
    const id = 1;
    const dto: CriarReservaDto = {
      locatario: 'locatario-uuid',
      locadora: 'locadora-uuid',
      veiculo: 'Corolla 2024',
      dataInicio: '2025-08-05',
      dataFim: '2025-08-15',
      valorBase: 1600,
      seguros: ['completo'],
      valorTotal: 2000,
      status: 'Ativa',
    };

    const expectedResult = { id, ...dto };

    mockService.editarReserva.mockResolvedValue(expectedResult);

    const result = await controller.editarReserva(id, dto);
    expect(result).toEqual(expectedResult);
    expect(mockService.editarReserva).toHaveBeenCalledWith(id, dto);
  });
});
