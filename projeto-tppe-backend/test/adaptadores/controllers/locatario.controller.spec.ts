import { Test, TestingModule } from '@nestjs/testing';
import { LocatarioController } from '../../../src/adaptadores/controllers/locatario.controller';
import { LocatarioServiceImpl } from '../../../src/aplicacao/implementation/locatario.implematation';
import { CriarLocatarioDto } from '../../../src/aplicacao/service/locatario/dto/criarLocatario.dto';

describe('LocatarioController', () => {
  let controller: LocatarioController;
  let service: LocatarioServiceImpl;

  const mockLocatarioService = {
    criarLocatario: jest.fn(),
    listarLocatarios: jest.fn(),
    totalLocatarios: jest.fn(),
    deleteLocatario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocatarioController],
      providers: [
        {
          provide: LocatarioServiceImpl,
          useValue: mockLocatarioService,
        },
      ],
    }).compile();

    controller = module.get<LocatarioController>(LocatarioController);
    service = module.get<LocatarioServiceImpl>(LocatarioServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call criarLocatario with the correct DTO', async () => {
    const dto: CriarLocatarioDto = {
      nome: 'João da Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      tipo: 'F',
      documento: '123.456.789-00',
      endereco: 'Rua das Laranjeiras, 45',
      status: 'Ativo',
    };

    const result = { id: 'abc123', ...dto };

    mockLocatarioService.criarLocatario.mockResolvedValue(result);

    const response = await controller.cadastrarLocatario(dto);

    expect(response).toEqual(result);
    expect(mockLocatarioService.criarLocatario).toHaveBeenCalledWith(dto);
  });

  it('should return list of locatarios', async () => {
    const lista = [
      { id: '1', nome: 'Maria', email: 'maria@email.com' },
      { id: '2', nome: 'Carlos', email: 'carlos@email.com' },
    ];

    mockLocatarioService.listarLocatarios.mockResolvedValue(lista);

    const response = await controller.listarLocatarios();

    expect(response).toEqual(lista);
    expect(mockLocatarioService.listarLocatarios).toHaveBeenCalled();
  });

  it('should return total of active locatarios', async () => {
    const total = 8;

    mockLocatarioService.totalLocatarios.mockResolvedValue(total);

    const response = await controller.retornaTotadeLocatarios();

    expect(response).toEqual(total);
    expect(mockLocatarioService.totalLocatarios).toHaveBeenCalled();
  });

  it('should delete locatario by id', async () => {
    const id = 'abc123';
    const result = { deleted: true };

    mockLocatarioService.deleteLocatario.mockResolvedValue(result);

    const response = await controller.deleteLocatario(id);

    expect(response).toEqual(result);
    expect(mockLocatarioService.deleteLocatario).toHaveBeenCalledWith(id);
  });
});
