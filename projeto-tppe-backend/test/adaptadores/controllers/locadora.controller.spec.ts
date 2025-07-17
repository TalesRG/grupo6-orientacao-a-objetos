import { Test, TestingModule } from '@nestjs/testing';
import { LocadoraController } from '../../../src/adaptadores/controllers/locadora.controller';
import { LocadoraServiceImpl } from '../../../src/aplicacao/implementation/locadora.implematation';
import { CriarLocadoraDto } from '../../../src/aplicacao/service/locadora/dto/criarLocadora.dto';

describe('LocadoraController', () => {
  let controller: LocadoraController;
  let service: LocadoraServiceImpl;

  const mockService = {
    criarLocadora: jest.fn(),
    listarLocadoras: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocadoraController],
      providers: [
        {
          provide: LocadoraServiceImpl,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LocadoraController>(LocadoraController);
    service = module.get<LocadoraServiceImpl>(LocadoraServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova locadora', async () => {
    const dto: CriarLocadoraDto = {
      nome: 'Locadora XPTO',
      cnpj: '12345678000100',
      telefone: '11999999999',
      email: 'contato@xpto.com',
      endereco: 'Rua das Locadoras, 123',
      status: 'Ativa',
    };

    const expectedResult = {
      id: '1',
      ...dto,
    };

    mockService.criarLocadora.mockResolvedValue(expectedResult);

    const result = await controller.cadastarLocadora(dto);
    expect(result).toEqual(expectedResult);
    expect(mockService.criarLocadora).toHaveBeenCalledWith(dto);
  });

  it('deve retornar uma lista de locadoras', async () => {
    const expectedList = [
      {
        id: '1',
        nome: 'Locadora A',
        cnpj: '11111111000111',
        telefone: '11999990000',
        email: 'a@locadora.com',
        endereco: 'Rua A, 123',
        status: 'Ativa',
      },
      {
        id: '2',
        nome: 'Locadora B',
        cnpj: '22222222000122',
        telefone: '11988880000',
        email: 'b@locadora.com',
        endereco: 'Rua B, 456',
        status: 'Inativa',
      },
    ];

    mockService.listarLocadoras.mockResolvedValue(expectedList);

    const result = await controller.listarLocadoras();
    expect(result).toEqual(expectedList);
    expect(mockService.listarLocadoras).toHaveBeenCalledTimes(1);
  });
});
