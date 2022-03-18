package Menu;

import java.util.Scanner;

public class CadastrarVe�culos {
	
	public static void cadastro() {
		Scanner cadastrarV=new Scanner(System.in);		
		System.out.println("Cadastrando...");
		System.out.println("Coloque a Marca do Ve�culo:");
		String Marca=cadastrarV.nextLine();
		System.out.println("Coloque o Modelo do Ve�culo:");
		String Modelo=cadastrarV.nextLine();
		System.out.println("Coloque o Ano de Fabrica��o:");
		String AnoFab=cadastrarV.nextLine();
		System.out.println("Coloque o Ano de Modelo:");
		String AnoMod=cadastrarV.nextLine();
		System.out.println("Coloque o N�mero do Renavam:");
		String Renavam=cadastrarV.nextLine();
		System.out.println("Coloque a Capacidade do TANQUE:");
		String CapacidadedoTanque=cadastrarV.nextLine();
		System.out.println("Dados cadastrados: ");
		System.out.println("Marca: "+Marca);
		System.out.println("Modelo: "+Modelo);
		System.out.println("Ano de Fabrica��o: "+AnoFab);
		System.out.println("Ano Modelo: "+AnoMod);
		System.out.println("Renavam: "+Renavam);
		System.out.println("Capacidade do Tanque: "+CapacidadedoTanque);
	}
	public static void CadastrarVeiculo() {
		
	System.out.println("-------------------- Cadastro de Ve�culos -----------------\n");
	System.out.println("                 1 - Cadastrar Ve�culos de Passeio           ");
	System.out.println("                 2 - Cadastrar ve�culo utilit�rio            ");
	System.out.println("                 3 - Cadastrar Motocicleta                   ");
	System.out.println("                                                             ");
	System.out.println("                 Escolha uma dessas op��es:                  ");
	}
	
	public static void CadastrarPasseio() {
		Scanner cadastrarP=new Scanner(System.in);
		System.out.println("Cadastrando Ve�culo de Passeio...");
		System.out.println("Coloque a Categoria do Ve�culo:");
		String CategoriaVeiculo=cadastrarP.nextLine();
		System.out.println("O ve�culo possui ar condicionado? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String Arcondicionado=cadastrarP.nextLine();
		String Ar;
		Ar=Arcondicionado;
		if(Ar=="Sim"||Ar=="sim") {
			System.out.print("Ar Condicionado: Possui");
		} else if(Ar=="N�o"||Ar=="n�o") {
			System.out.print("Ar Condicionado: N�o possui");
		}
		System.out.println("O ve�culo possui Dire��o Hidraulica? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String DirecaoHidraulica=cadastrarP.nextLine();;
		String Direcao;
		Direcao=DirecaoHidraulica;
		if(Direcao=="Sim"||Direcao=="s") {
			System.out.print("Direcao Hidraulica: Possui");
		} else if(Direcao=="N�o"||Direcao=="n�o") {
			System.out.print("Direcao Hidraulica: N�o possui");
		}
		System.out.println("O ve�culo tem c�mbio autom�tico? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String CambioAutomatico=cadastrarP.nextLine();;
		String Cambio;
		Cambio=CambioAutomatico;
		if((Cambio=="Sim")||(Cambio=="sim")) {
			System.out.print("C�mbio Autom�tico: Possui");
		} else if(Cambio=="N�o"||Cambio=="n�o") {
			System.out.print("C�mbio Autom�tico: N�o possui");
		}
		System.out.println("Dados cadastrados: ");
		System.out.println("Categoria do Ve�culo: "+CategoriaVeiculo);
		System.out.println("Arcondicionado: "+Ar);
		System.out.println("Ano de Fabrica��o: "+Direcao);
		System.out.println("Ano Modelo: "+Cambio);
	}
	
	public static void CadastrarUtilitario() {
		Scanner cadastrarU=new Scanner(System.in);	
	    System.out.println("Cadastrando Utilitario");
	    System.out.println("O ve�culo � do tipo carga ou passageiro? Digite carga ou passageiro");		
		String EscolhaU=cadastrarU.nextLine();
		String EscolhaUt;
	    EscolhaUt=EscolhaU;
		if((EscolhaU=="Carga")||(EscolhaU=="carga")) {
			System.out.print("Ve�culo de carga");
			
		}  
			else if((EscolhaU=="Passageiro")||(EscolhaU=="passageiro")) {
				System.out.print("Ve�culo de Passageiro");
			}
	}
	public static void CadastrarMotocicleta() {
		Scanner cadastrarM=new Scanner(System.in);	
		System.out.println("Cadastrando Motocicleta...");
		System.out.println("O ve�culo tem Controle de Tra��o? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String ControleTracao=cadastrarM.nextLine();;
		String Controle;
		Controle=ControleTracao;
		if((Controle=="Sim")||(Controle=="sim")) {
			System.out.print("Controle Tra��o: Possui");
		} else if(Controle=="N�o"||Controle=="n�o") {
			System.out.print("Controle Tra��o: N�o possui");
		}
		System.out.println("O ve�culo tem Freio ABS? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String FreioAbs=cadastrarM.nextLine();
		String Freio;
		Freio=FreioAbs;
		if((Freio=="Sim")||(Freio=="sim")) {
			System.out.print("Freio Abs: Possui");
		} else if((Freio=="N�o")||(Freio=="n�o")) {
			System.out.print("Freio Abs: N�o possui");
		}
		System.out.println("O ve�culo tem Piloto Automatico? Digite Sim/sim se possuir e N�o/n�o se n�o possuir:");
		String PilotoAutomatico=cadastrarM.nextLine();
		String Piloto;
		Piloto=PilotoAutomatico;
		if((Piloto=="Sim")||(Piloto=="sim")) {
			System.out.print("Piloto Automatico: Possui");
		} else if((Piloto=="N�o")||(Piloto=="n�o")) {
			System.out.print("Piloto Automatico: N�o possui");
		}
		System.out.println("Digite o modo de pilotagem: Cidade/Estrada/Sport/Off-Road");
		String MododePilotagem=cadastrarM.nextLine();
		String Modo;
		Modo=MododePilotagem;
		if((Piloto=="Cidade")) {
			System.out.print("Modo de Pilotagem: Cidade");
		} else if ((Piloto=="Estrada")) {
			System.out.print("Piloto Automatico: Estrada");
		}     else if ((Piloto=="Sport")){
			   System.out.print("Modo de Piltogem: Sport");
		}       else if ((Piloto=="Off-Road")) {
			      System.out.print("Modo de Pilotagem: Off-Road");
		}
		System.out.println("Dados cadastrados: ");
		System.out.println("Controle de Tra��o: "+Controle);
		System.out.println("Freio ABS: "+Freio);
		System.out.println("Piloto Autom�tico: "+Piloto);
		System.out.println("Modo de Pilotagem: "+Modo);
	}
}
