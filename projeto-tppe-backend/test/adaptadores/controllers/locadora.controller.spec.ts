import { Test, TestingModule } from '@nestjs/testing';
import { LocadoraController } from '../../../src/adaptadores/controllers/locadora.controller';
import { LocadoraServiceImpl } from '../../../src/aplicacao/implementation/locadora.implematation';
import { CriarLocadoraDto } from '../../../src/aplicacao/service/locadora/dto/criarLocadora.dto';

describe('LocadoraController', () => {
  let controller: LocadoraController;
  let service: LocadoraServiceImpl;

  const mockLocadoraService = {
    criarLocadora: jest.fn(),
    listarLocadoras: jest.fn(),
    totalLocadoras: jest.fn(),
    deleteLocadora: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocadoraController],
      providers: [
        {
          provide: LocadoraServiceImpl,
          useValue: mockLocadoraService,
        },
      ],
    }).compile();

    controller = module.get<LocadoraController>(LocadoraController);
    service = module.get<LocadoraServiceImpl>(LocadoraServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call criarLocadora with the correct DTO', async () => {
    const dto: CriarLocadoraDto = {
      nome: 'Locadora A',
      cnpj: '12.345.678/0001-90',
      telefone: '(11) 99999-9999',
      email: 'locadora@email.com',
      endereco: 'Rua das Flores, 123',
      status: 'Ativa',
    };

    const result = { id: '1', ...dto };

    mockLocadoraService.criarLocadora.mockResolvedValue(result);

    const response = await controller.cadastarLocadora(dto);

    expect(response).toEqual(result);
    expect(mockLocadoraService.criarLocadora).toHaveBeenCalledWith(dto);
  });

  it('should return list of locadoras', async () => {
    const locadoras = [{ id: '1', nome: 'Locadora A' }];
    mockLocadoraService.listarLocadoras.mockResolvedValue(locadoras);

    const response = await controller.listarLocadoras();

    expect(response).toEqual(locadoras);
    expect(mockLocadoraService.listarLocadoras).toHaveBeenCalled();
  });

  it('should return total of active locadoras', async () => {
    const total = 5;
    mockLocadoraService.totalLocadoras.mockResolvedValue(total);

    const response = await controller.totalLocadoras();

    expect(response).toEqual(total);
    expect(mockLocadoraService.totalLocadoras).toHaveBeenCalled();
  });

  it('should delete locadora by id', async () => {
    const id = '123';
    const result = { deleted: true };

    mockLocadoraService.deleteLocadora.mockResolvedValue(result);

    const response = await controller.deleteLocadora(id);

    expect(response).toEqual(result);
    expect(mockLocadoraService.deleteLocadora).toHaveBeenCalledWith(id);
  });
});
