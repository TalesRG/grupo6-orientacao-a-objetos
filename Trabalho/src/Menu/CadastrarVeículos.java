package Menu;

import java.util.Scanner;

public class CadastrarVe�culos {
	
	public static void cadastro() {
		
		Scanner cadastrarV=new Scanner(System.in);		
		
		// Obtendo os dados iniciais do ve�culo.
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
		
		// Mostrando os dados digitados
		System.out.println("\n\n\n");
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
	System.out.println("                 1 - Cadastrar Ve�culo de Passeio            ");
	System.out.println("                 2 - Cadastrar Ve�culo Utilit�rio            ");
	System.out.println("                 3 - Cadastrar Motocicleta                   ");
	System.out.println("                                                             ");
	System.out.println("                 Escolha uma dessas op��es:                  ");
	}
	
	public static void CadastrarPasseio() {
		
		Scanner cadastrarP=new Scanner(System.in);
		
		// Obtendo os dados dos itens opcionais de ve�culos de passeio.
		System.out.println("Cadastrando Ve�culo de Passeio...");
		System.out.println("Coloque a Categoria do Ve�culo:");
		String CategoriaVeiculo=cadastrarP.nextLine();
		
		System.out.println("O ve�culo possui Ar-Condicionado? (Digite Sim/sim ou N�o/n�o)");
		String Arcondicionado=cadastrarP.nextLine();
		String Ar;
		Ar=Arcondicionado;
		if(Ar.equals("Sim")||Ar.equals("sim")){
			Ar="Possui";
		} else if(Ar.equals("N�o")||Ar.equals("n�o")){
			Ar="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		System.out.println("O ve�culo possui Dire��o Hidraulica? (Digite Sim/sim ou N�o/n�o");
		String DirecaoHidraulica=cadastrarP.nextLine();;
		String Direcao;
		Direcao=DirecaoHidraulica;
		if(Direcao.equals("Sim")||Direcao.equals("sim")){
			Direcao="Possui";
		} else if(Direcao.equals("N�o")|Direcao.equals("n�o")){
			Direcao="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		System.out.println("O ve�culo tem C�mbio Autom�tico? (Digite Sim/sim ou N�o/n�o");
		String CambioAutomatico=cadastrarP.nextLine();;
		String Cambio;
		Cambio=CambioAutomatico;
		if(Cambio.equals("Sim")||Cambio.equals("sim")){
			Cambio="Possui";
		} else if(Cambio.equals("N�o")||Cambio.equals("n�o")){
			Cambio="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		System.out.println("Dados cadastrados: ");
		System.out.println("Categoria do Ve�culo: "+CategoriaVeiculo);
		System.out.println("Arcondicionado: "+Ar);
		System.out.println("Dire��o Hidr�ulica: "+Direcao);
		System.out.println("C�mbio Autom�tico: "+Cambio);
	}
	
	public static void CadastrarUtilitario() {
		// Obtendo os dados dos itens opcionais de ve�culos utilit�rios.
		Scanner cadastrarU=new Scanner(System.in);	
	    System.out.println("Cadastrando Utilitario");
	    System.out.println("O ve�culo � do tipo Carga o Passageiro? (Digite Carga/carga ou Passageiro/passageiro)");		
		String EscolhaU=cadastrarU.nextLine();
		String EscolhaUt;
	    EscolhaUt=EscolhaU;
		if(EscolhaUt.equals("Carga")||(EscolhaUt.equals("carga"))) {
			System.out.println("Ve�culo de Carga");
			System.out.println("Qual � a capacidade de carga?");
			String CargaC=cadastrarU.nextLine();
			System.out.println("O ve�culo de carga possui Ar Condicionado? (Digite Sim/sim ou N�o/n�o)");
			String Arcondicionado=cadastrarU.nextLine();
			String Ar;
			Ar=Arcondicionado;
			if (Ar.equals("Sim")||Ar.equals("sim")){
				Ar="Possui";
			} else if(Ar.equals("N�o")||Ar.equals("n�o")){
				Ar="N�o Possui";
			}
			else {
				System.out.println("Op��o inv�lida. Tente novamente!");
			}
			System.out.println("O ve�culo de carga possui Dire��o Hidraulica? (Digite Sim/sim ou N�o/n�o)");
			String DirecaoHidraulica=cadastrarU.nextLine();;
			String Direcao;
			Direcao=DirecaoHidraulica;
			if(Direcao.equals("Sim")||Direcao.equals("sim")){
				Direcao="Possui";
			} else if(Direcao.equals("N�o")||Direcao.equals("n�o")){
				Direcao="N�o Possui";
			}
			else {
				System.out.println("Op��o inv�lida. Tente novamente!");
			}
			System.out.println("O ve�culo de carga possui Tv a bordo? (Digite Sim/sim ou N�o/n�o)");
			String Tvabordo=cadastrarU.nextLine();;
			String TV;
			TV=Tvabordo;
			if(TV.equals("Sim")||TV.equals("sim")){
				TV="Possui";
			} else if(TV.equals("N�o")|TV.equals("n�o")){
				TV="N�o Possui";
			}
			else {
				System.out.println("Op��o inv�lida. Tente novamente!");
			}
			System.out.println("Dados cadastrados: ");
			System.out.println("Categoria do Ve�culo: "+EscolhaUt);
			System.out.println("Capacidade de Carga: "+CargaC);
			System.out.println("Arcondicionado: "+Ar);
			System.out.println("Dire��o Hidr�ulica: "+Direcao);
			System.out.println("C�mbio Autom�tico: "+TV);
			
		}  
			else if(EscolhaUt.equals("Passageiro")||EscolhaUt.equals("passageiro")){
				System.out.print("Ve�culo de Passageiro");
				
				System.out.println("Qual � a tara do ve�culo? ");
				String Tara=cadastrarU.nextLine();
				
				System.out.println("Qual � o tamanho do compartimento de carga (Em litros)? ");
				String Compartimento=cadastrarU.nextLine();
				
				System.out.println("Qual � a capacidade de carga? ");
				String CargaP=cadastrarU.nextLine();
				
				System.out.println("Digite o tipo de carga: B�u/Graneleiro/Basculante");
				String TipoCarga=cadastrarU.nextLine();
				String Tipo;
				Tipo=TipoCarga;
				if(Tipo.equals("B�u")){
					Tipo="B�u";
				} else if(Tipo.equals("Graneleiro")){
					Tipo="Graneleiro";
				}     else if(Tipo.equals("Basculante")){
					   Tipo="Basculante";
				}
				else {
					System.out.println("Op��o inv�lida. Tente novamente!");
				}
				
				System.out.println("\n\n\n");
				System.out.println("Dados cadastrados: ");
				System.out.println("Categoria do Ve�culo: "+EscolhaUt);
				System.out.println("Capacidade de Carga: "+CargaP);
				System.out.println("Arcondicionado: "+Tara);
				System.out.println("Dire��o Hidr�ulica: "+Compartimento);
				System.out.println("C�mbio Autom�tico: "+Tipo);
			}
	}
	public static void CadastrarMotocicleta() {
		// Obtendo os dados dos itens opcionais de Motocicletas.
		Scanner cadastrarM=new Scanner(System.in);	
		System.out.println("Cadastrando Motocicleta...");
		
		System.out.println("O ve�culo tem Controle de Tra��o? (Digite Sim/sim ou N�o/n�o)");
		String ControleTracao=cadastrarM.nextLine();;
		String Controle;
		Controle=ControleTracao;
		if(Controle.equals("Sim")||Controle.equals("sim")){
			Controle="Possui";
		} else if(Controle.equals("N�o")||Controle.equals("n�o")){
			Controle="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		
		System.out.println("O ve�culo tem Freio ABS? (Digite Sim/sim ou N�o/n�o)");
		String FreioAbs=cadastrarM.nextLine();
		String Freio;
		Freio=FreioAbs;
		if(Freio.equals("Sim")||Freio.equals("sim")){
			Freio="Possui";
		} else if(Freio.equals("N�o")||Freio.equals("n�o")){
			Freio="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		
		System.out.println("O ve�culo tem Piloto Automatico? (Digite Sim/sim ou N�o/n�o)");
		String PilotoAutomatico=cadastrarM.nextLine();
		String Piloto;
		Piloto=PilotoAutomatico;
		if(Piloto.equals("Sim")||Piloto.equals("sim")){
			Piloto="Possui";
		} else if(Piloto.equals("N�o")||Piloto.equals("n�o")){
			Piloto="N�o Possui";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		
		System.out.println("Digite o Modo de Pilotagem: Cidade/Estrada/Sport/Off-Road");
		String MododePilotagem=cadastrarM.nextLine();
		String Modo;
		Modo=MododePilotagem;
		if(Modo.equals("Cidade")){
			Modo="Cidade";
		} else if(Modo.equals("Estrada")){
			Modo="Estrada";
		}     else if(Modo.equals("Sport")){
			   Modo="Sport";
		}       else if(Piloto.equals("Off-Road")){
			     Modo="Off-Road";
		}
		else {
			System.out.println("Op��o inv�lida. Tente novamente!");
		}
		
		System.out.println("\n\n\n");
		System.out.println("Dados cadastrados: ");
		System.out.println("Controle de Tra��o: "+Controle);
		System.out.println("Freio ABS: "+Freio);
		System.out.println("Piloto Autom�tico: "+Piloto);
		System.out.println("Modo de Pilotagem: "+Modo);
	}
}
