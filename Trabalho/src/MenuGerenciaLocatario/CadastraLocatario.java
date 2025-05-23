package MenuGerenciaLocatario;

import java.util.ArrayList;
import java.util.Scanner;

import Excecoes.CampoEmBrancoException;
import Excecoes.ObjetoNaoEncontradoException;
import Menu.Menu;
import gerenciaLocatarios.Endereco;
import gerenciaLocatarios.PessoaFisica;
import gerenciaLocatarios.PessoaJuridica;

public class CadastraLocatario {
	
	// Criando o leitor que vai ser usado em toda a classe.
	public static Scanner leitorP = new Scanner(System.in);
	
	private static void clearBuffer(Scanner scanner) {
        if (scanner.hasNextLine()) {
            scanner.nextLine();
        }
    }
	
	public static void CadastrarPessoa() {
		
		
	System.out.println("------------------- Cadastro de Locatario  ----------------\n");
	System.out.println("                 1 - Cadastrar Pessoa F�sica                 ");
	System.out.println("                 2 - Cadastrar Pessoa Jur�dica               ");
	System.out.println("                                                             ");
	System.out.println("                 Escolha uma dessas op��es:                  ");
	}
	
	public static PessoaFisica cadastrarPessoaFisica() {
		Endereco enderecoF=new Endereco(null, null, null, null, null, null, null);
		PessoaFisica PessoaF= new PessoaFisica(null, null, null, null, null, null);
		
		
		System.out.println("Cadastrando Locat�rio...");
		clearBuffer(leitorP);
		System.out.println("Coloque o seu Nome Completo:");
		PessoaF.setNome(leitorP.nextLine());
		
		System.out.println("Coloque o seu CPF:");
		PessoaF.setCpf(leitorP.nextLine());
		
		System.out.println("Coloque o seu Estado Civil:");
		PessoaF.setEstadocivil(leitorP.nextLine());
		
		System.out.println("Coloque o seu Email:");
		PessoaF.setEmail(leitorP.nextLine());
		
		boolean validaNome = checaCampoBranco(PessoaF.getNome());
		boolean validaCPF = checaCampoBranco(PessoaF.getCpf());
		boolean validaEmail = checaCampoBranco(PessoaF.getEmail());
		
		try {
			if (validaNome == false || validaCPF == false || validaEmail == false  ) {
				throw new CampoEmBrancoException("Erro! Um campo foi deixado em branco!");
			}
		} catch (CampoEmBrancoException e) {
			System.out.println(e.getMessage());
			System.out.println("Deseja tentar novamente? Digite Sim/sim ou N�o/n�o");
			String Tentar;
			Tentar=leitorP.nextLine();
			if((Tentar.equals("Sim"))||(Tentar.equals("sim"))){
				cadastrarPessoaFisica();
			} else if((Tentar.equals("N�o"))||(Tentar.equals("n�o"))){
				System.out.println("Retornando ao programa...");
				try {
					Menu.main(null);
				} catch (ObjetoNaoEncontradoException e1) {
					e1.printStackTrace();
				}
		}
		}
		
		System.out.println("Coloque o seu Telefone:");
		PessoaF.setCelular(leitorP.nextLine());
		
		System.out.println("Informe seu endere�o: ");
		System.out.println("Logadouro:");
		enderecoF.setLogadouro(leitorP.nextLine());
		
		System.out.println("Numero:");
		enderecoF.setNumero(leitorP.nextLine());
		
		System.out.println("Complemento:");
		enderecoF.setComplemento(leitorP.nextLine());
		
		System.out.println("Bairro:");
		enderecoF.setBairro(leitorP.nextLine());
		
		System.out.println("Cidade:");
		enderecoF.setCidade(leitorP.nextLine());
		
		System.out.println("Estado:");
		enderecoF.setEstado(leitorP.nextLine());
		
		System.out.println("Cep:");
		enderecoF.setCep(leitorP.nextLine());
		
		
		
		System.out.println("- - - - - - - - - - - - - - - ");	
		System.out.println("Dados cadastrados de Pessoa F�sica: ");
		System.out.println("- - - - - - - - - - - - - - - ");	
		System.out.println("Nome Completo: "+PessoaF.getNome());
		System.out.println("CPF: "+PessoaF.getCpf());
		System.out.println("Estado Civil: "+PessoaF.getEstadocivil());
		System.out.println("Email: "+PessoaF.getEmail());
		System.out.println("Telefone: "+PessoaF.getCelular());
		System.out.println("Endere�o: "+enderecoF.getLogadouro()+" "+enderecoF.getNumero()+" "+enderecoF.getComplemento()+" "+enderecoF.getBairro()
										+" "+enderecoF.getCidade()+" "+enderecoF.getEstado()+" "+enderecoF.getCep());
		System.out.println("- - - - - - - - - - - - - - - ");
		
		return PessoaF;	
		
		
	   
	}
	
	
	private static boolean checaCampoBranco(String string) {
		
	    // Checando se a string � "null".
	    if (string == null) {
	      return false;
	    }
	    // Checando se a string esta vazio (s� contem espa�os).
	    else if (string.trim().isEmpty()){
	      return false;
	    }

	    return true;

	}

	
	public static PessoaJuridica cadastrarPessoaJuridica() {
		Endereco enderecoJ=new Endereco(null, null, null, null, null, null, null);
		PessoaJuridica PessoaJ=new PessoaJuridica(null, null, null, null);
		System.out.println("Cadastrando Locat�rio...");
		
		System.out.println("Coloque o Nome Social da sua Empresa:");
		PessoaJ.setNomeSocial(leitorP.nextLine());
		System.out.println("Coloque o CNPJ:");
		PessoaJ.setCnpj(leitorP.nextLine());
		System.out.println("Coloque o seu Email:");
		PessoaJ.setEmail(leitorP.nextLine());
		System.out.println("Coloque o seu Telefone:");
		PessoaJ.setCelular(leitorP.nextLine());
		
		System.out.println("Infome seu endere�o: \n");
		System.out.println("Logadouro:");
		enderecoJ.setLogadouro(leitorP.nextLine());
		
		System.out.println("Numero:");
		enderecoJ.setNumero(leitorP.nextLine());
		
		System.out.println("Complemento:");
		enderecoJ.setComplemento(leitorP.nextLine());
		
		System.out.println("Bairro:");
		enderecoJ.setBairro(leitorP.nextLine());
		
		System.out.println("Cidade:");
		enderecoJ.setCidade(leitorP.nextLine());
		
		System.out.println("Estado:");
		enderecoJ.setEstado(leitorP.nextLine());
		
		System.out.println("Cep:");
		enderecoJ.setCep(leitorP.nextLine());
	
		
		
		System.out.println("- - - - - - - - - - - - - - - ");	
		System.out.println("Dados cadastrados de Pessoa Jur�dica: ");
		System.out.println("- - - - - - - - - - - - - - - ");	
		System.out.println("Nome da Empresa: "+PessoaJ.getNomeSocial());
		System.out.println("CNPJ: "+PessoaJ.getCnpj());
		System.out.println("Email: "+PessoaJ.getEmail());
		System.out.println("Telefone: "+PessoaJ.getCelular());
		System.out.println("Endere�o: "+enderecoJ.getLogadouro()+" "+enderecoJ.getNumero()+" "+enderecoJ.getComplemento()+" "+enderecoJ.getBairro()
		+" "+enderecoJ.getCidade()+" "+enderecoJ.getEstado()+" "+enderecoJ.getCep());
		System.out.println("- - - - - - - - - - - - - - - ");
		return PessoaJ;
		
	}
}
