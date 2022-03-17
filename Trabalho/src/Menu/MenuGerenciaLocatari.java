package Menu;

import java.util.Scanner;

public class MenuGerenciaLocatari {
	
	public static void MenuLocatario() {
		
		System.out.println("------------- Menu [Ger�ncia de Locat�rios] ---------------\n");
		System.out.println("                 1 - Cadastrar Locat�rio                     ");
		System.out.println("                 2 - Buscar Locat�rio                        ");
		System.out.println("                 3 - Pesquisar Locat�rio                     ");
		System.out.println("                 4 - Excluir Locat�rio                       ");
		System.out.println("                                                             ");
		System.out.println("                 Escolha uma dessas op��es:                  ");
			
		}
	
	public static void cadastrarlocatario() {
		Scanner cadastrar=new Scanner(System.in);
		System.out.println("Cadastrando Locat�rio...");
		System.out.println("Digite f se quer alugar como uma pessoa fisica , ou  j como  pessoa juridica...");
		String escolhaTipo;
		escolhaTipo = cadastrar.nextLine();
		char escolha = escolhaTipo.charAt(0);
		if((escolha == 'f')|| (escolha == 'F')) {
		System.out.println("Coloque o seu nome completo:");
		String nomeCompleto=cadastrar.nextLine();
		System.out.println("Coloque o seu Cpf:");
		String cpf=cadastrar.nextLine();
		System.out.println("Coloque o seu estado civil:");
		String estadoCivil=cadastrar.nextLine();
		
		System.out.println("Dados cadastrados: ");
		System.out.println("nome completo: "+nomeCompleto);
		System.out.println("cpf: "+cpf);
		System.out.println("estado civil: "+estadoCivil);
		
			
		}else if((escolha == 'j')|| (escolha == 'J')) {
			
		System.out.println("Coloque o nome social da sua empresa:");
		String nomeEmpresa=cadastrar.nextLine();
		System.out.println("Coloque o nome da pessoa autorizada a realizar loca��es:");
		String nome=cadastrar.nextLine();
		System.out.println("Dados cadastrados: ");
		System.out.println("Nome da Empresa: "+nomeEmpresa);
		System.out.println("Nome da pessoa: "+nome);
		
			
		}
		System.out.println("Coloque o seu endere�o:");
		String Endereco=cadastrar.nextLine();
		System.out.println("Coloque o seu Email:");
		String Email=cadastrar.nextLine();
		System.out.println("Coloque o seu Telefone:");
		String Telefone=cadastrar.nextLine();
		System.out.println("Dados cadastrados: ");
		System.out.println("Endere�o: "+Endereco);
		System.out.println("Email: "+Email);
		System.out.println("Telefone: "+Telefone);
	   
	}
	public static void buscarlocatario() {
		System.out.println("Metodo Buscar Loc�tario...");
	}
	
	public static void pesquisarlocatario() {
		System.out.println("Metodo Pesquisar Loc�tario...");
	}
	
	public static void excluirlocatario() {
		System.out.println("Metodo Excluir Loc�tario...");
	}
	
	public static void main(String [] args) {
		
		int escolha=0;
		
		Scanner ler=new Scanner(System.in);
		
		MenuLocatario();
		
		escolha=ler.nextInt();
		
		switch(escolha) {
		case 1:
			cadastrarlocatario();
			break;
		case 2:
			buscarlocatario();
			break;
		case 3:
			pesquisarlocatario();
			break;
		case 4:
			excluirlocatario();
			break;
			
			default:
				System.out.println("Escolha inv�lida, tente novamente!");
			
		}
	}
}