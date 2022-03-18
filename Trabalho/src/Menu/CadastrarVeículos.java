package Menu;

import java.util.Scanner;

public class CadastrarVe�culos {
	
	public static void cadastro() {

		Scanner cadastrarV = new Scanner(System.in);

		// Obtendo os dados iniciais do ve�culo.
		System.out.println("Cadastrando...");
		System.out.println("Coloque a Marca do Ve�culo:");
		String Marca = cadastrarV.nextLine();

		System.out.println("Coloque o Modelo do Ve�culo:");
		String Modelo = cadastrarV.nextLine();

		System.out.println("Coloque o Ano de Fabrica��o:");
		String AnoFab = cadastrarV.nextLine();

		System.out.println("Coloque o Ano de Modelo:");
		String AnoMod = cadastrarV.nextLine();

		System.out.println("Coloque o N�mero do Renavam:");
		String Renavam = cadastrarV.nextLine();

		System.out.println("Coloque a Capacidade do Tanque:");
		String CapacidadeTanque = cadastrarV.nextLine();

		// Mostrando os dados digitados.
		System.out.println("\n\n\n");
		System.out.println("Dados cadastrados: ");
		System.out.println("Marca: " + Marca);
		System.out.println("Modelo: " + Modelo);
		System.out.println("Ano de Fabrica��o: " + AnoFab);
		System.out.println("Ano Modelo: " + AnoMod);
		System.out.println("Renavam: " + Renavam);
		System.out.println("Capacidade do Tanque: " + CapacidadeTanque);
	}

	public static void CadastrarVeiculo() {

	System.out.println("-------------------- Cadastro de Ve�culos -----------------\n");
	System.out.println("                 1 - Cadastrar Ve�culo de Passeio            ");
	System.out.println("                 2 - Cadastrar Ve�culo Utilit�rio            ");
	System.out.println("                 3 - Cadastrar Motocicleta                   ");
	System.out.println("                                                             ");
	System.out.println("                 Escolha uma dessas op��es:                  ");

	}
	
	public static void CadastrarPasseio() {

		Scanner cadastrarP = new Scanner(System.in);

		// Obtendo os dados dos itens opcionais de ve�culos de passeio.
		System.out.println("Cadastrando Ve�culo de Passeio...");
		System.out.println("Coloque a Categoria do Ve�culo:");
		String CategoriaVeiculo = cadastrarP.nextLine();

		System.out.println("O ve�culo possui Ar-Condicionado? (Digite sim ou n�o)");
		String Ar = cadastrarP.nextLine();
		Boolean ArCondicionado = true; 
		// Usando o m�todo �.equalsIgnoreCase()� para verificar o que foi digitado. Essa estrutura � repetida ao longo do c�digo.
		if (Ar.equalsIgnoreCase("sim")) {
			System.out.print("Ar-Condicionado: Possui");
		} else if (Ar.equalsIgnoreCase("n�o")) {
			ArCondicionado = false;
			System.out.print("Ar-Condicionado: N�o possui");
		}

		System.out.println("O ve�culo possui Dire��o Hidraulica? (Digite sim ou n�o)");
		String Direcao = cadastrarP.nextLine();
		Boolean DirecaoHidraulica = true;
		if (Direcao.equalsIgnoreCase("sim")) {
			System.out.print("Direcao Hidraulica: Possui");
		} else if (Direcao.equalsIgnoreCase("n�o")) {
			DirecaoHidraulica = false;
			System.out.print("Direcao Hidraulica: N�o possui");
		}

		System.out.println("O ve�culo tem C�mbio Autom�tico? (Digite sim ou n�o)");
		String Cambio = cadastrarP.nextLine();
		Boolean CambioAutomatico = true;
		if (Cambio.equalsIgnoreCase("sim")) {
			System.out.print("C�mbio Autom�tico: Possui");
		} else if (Cambio.equalsIgnoreCase("n�o")) {
			CambioAutomatico = false;
			System.out.print("C�mbio Autom�tico: N�o possui");
		}

		System.out.println("\n\n\n");
		System.out.println("Dados cadastrados: ");
		System.out.println("Categoria do Ve�culo: "+ CategoriaVeiculo);
		System.out.println("Ar-Condicionado: " + Ar);
		System.out.println("Dire��o Hidr�ulica: " + Direcao);
		System.out.println("C�mbio Autom�tico: " + Cambio);
	}
	
	public static void CadastrarUtilitario() {

		// Obtendo os dados dos itens opcionais de ve�culos utilit�rios.
	    System.out.println("Cadastrando Utilitario");
	    System.out.println("O ve�culo � do tipo Carga o Passageiro? (Digite carga ou passageiro)");		
		Scanner cadastrarU = new Scanner(System.in);
		String EscolhaU = cadastrarU.nextLine();
		if (EscolhaU.equalsIgnoreCase("carga")) {
			System.out.println("Ve�culo de Carga");
		}  
		else if (EscolhaU.equalsIgnoreCase("passageiro")) {
			System.out.println("Ve�culo de Passageiro");
		}
	}

	public static void CadastrarMotocicleta() {

		Scanner cadastrarM = new Scanner(System.in);
		System.out.println("Cadastrando Motocicleta...");

		System.out.println("O ve�culo tem Controle de Tra��o? (Digite sim ou n�o)");
		String Controle = cadastrarM.nextLine();;
		Boolean ControleTracao = true;
		if (Controle.equalsIgnoreCase("sim")) {
			System.out.print("Controle Tra��o: Possui");
		} else if (Controle.equalsIgnoreCase("n�o")) {
			ControleTracao = false;
			System.out.print("Controle Tra��o: N�o possui");
		}

		System.out.println("O ve�culo tem Freio ABS? (Digite sim ou n�o)");
		String Freio = cadastrarM.nextLine();
		Boolean FreioAbs = true;
		if (Freio.equalsIgnoreCase("sim")) {
			System.out.print("Freio Abs: Possui");
		} else if (Freio.equalsIgnoreCase("n�o")) {
			FreioAbs = false;
			System.out.print("Freio Abs: N�o possui");
		}

		System.out.println("O ve�culo tem Piloto Automatico? (Digite sim ou n�o)");
		String Piloto = cadastrarM.nextLine();
		Boolean PilotoAutomatico = true;
		if (Piloto.equalsIgnoreCase("sim")) {
			System.out.print("Piloto Automatico: Possui");
		} else if (Piloto.equalsIgnoreCase("n�o")) {
			PilotoAutomatico = false;
			System.out.print("Piloto Automatico: N�o possui");
		}

		System.out.println("Digite o Modo de Pilotagem: (Digite Cidade, Estrada, Sport ou Off-Road)");
		String ModoPilotagem = cadastrarM.nextLine();
		if (ModoPilotagem.equalsIgnoreCase("cidade")) {
			System.out.print("Modo de Pilotagem: Cidade");

		} else if (ModoPilotagem.equalsIgnoreCase("estrada")) {
			System.out.print("Piloto Automatico: Estrada");

		} else if (ModoPilotagem.equalsIgnoreCase("sport")){
			System.out.print("Modo de Piltogem: Sport");

		} else if (ModoPilotagem.equalsIgnoreCase("off-road")) {
			System.out.print("Modo de Pilotagem: Off-Road");
		}

		System.out.println("\n\n\n");
		System.out.println("Dados cadastrados: ");
		System.out.println("Controle de Tra��o: " + Controle);
		System.out.println("Freio ABS: " + Freio);
		System.out.println("Piloto Autom�tico: " + Piloto);
		System.out.println("Modo de Pilotagem: " + ModoPilotagem);
	}
}
