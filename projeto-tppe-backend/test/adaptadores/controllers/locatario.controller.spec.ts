import { Test, TestingModule } from '@nestjs/testing';
import { LocatarioController } from '../../../src/adaptadores/controllers/locatario.controller';
import { LocatarioServiceImpl } from '../../../src/aplicacao/implementation/locatario.implematation';
import { CriarLocatarioDto } from '../../../src/aplicacao/service/locatario/dto/criarLocatario.dto';

describe('LocatarioController', () => {
  let controller: LocatarioController;
  let service: LocatarioServiceImpl;

  const mockService = {
    criarLocatario: jest.fn(),
    listarLocatarios: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocatarioController],
      providers: [
        {
          provide: LocatarioServiceImpl,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LocatarioController>(LocatarioController);
    service = module.get<LocatarioServiceImpl>(LocatarioServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo locatário', async () => {
    const dto: CriarLocatarioDto = {
      nome: 'Ana Souza',
      email: 'ana@example.com',
      telefone: '11999999999',
      tipo: 'Pessoa Física',
      documento: '12345678900',
      endereco: 'Rua Teste, 123',
      status: 'Ativo',
    };

    const expectedResult = {
      id: '1',
      ...dto,
    };

    mockService.criarLocatario.mockResolvedValue(expectedResult);

    const result = await controller.cadastrarLocatario(dto);
    expect(result).toEqual(expectedResult);
    expect(mockService.criarLocatario).toHaveBeenCalledWith(dto);
  });

  it('deve listar os locatários', async () => {
    const expectedList = [
      {
        id: '1',
        nome: 'Ana Souza',
        email: 'ana@example.com',
        telefone: '11999999999',
        tipo: 'Pessoa Física',
        documento: '12345678900',
        endereco: 'Rua Teste, 123',
        status: 'Ativo',
      },
      {
        id: '2',
        nome: 'Carlos Lima',
        email: 'carlos@example.com',
        telefone: '11988888888',
        tipo: 'Pessoa Jurídica',
        documento: '98765432000199',
        endereco: 'Av. Central, 456',
        status: 'Inativo',
      },
    ];

    mockService.listarLocatarios.mockResolvedValue(expectedList);

    const result = await controller.listarLocatarios();
    expect(result).toEqual(expectedList);
    expect(mockService.listarLocatarios).toHaveBeenCalledTimes(1);
  });
});
