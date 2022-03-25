package gerenciaReserva;

import gerenciaFrota.Veiculo;

public class Reserva {
	
	private int id,
				diarias,
				dataInicio,
				dataFim;
	
	private ValorTotal total;
	
	private Veiculo veiculo;
	
	public Reserva(int id, int diarias, int dataInicio, int dataFim, ValorTotal total, Veiculo veiculo) {
		this.id = id;
		this.diarias = diarias;
		this.dataInicio = dataInicio;
		this.dataFim = dataFim;
		this.setTotal(total);
		this.setVeiculo(veiculo);
	}
	
	public void emitirRelatorio() {
		/**
		
		Modelo do Relat�rio

		Reserva: <numero_da_reserva>
	    Locat�rio: <nome_da_PF_ou_PJ>
	    Respons�vel pela loca�ao: <nome_da_PF>

	    ****************************** Dados da Loca��o ******************************

	    In�cio: <data_de_inicio> - <hora_de_inicio>
	    Fim: <data_de_fim> - <hora_de_fim>
	    N�mero de di�rias calculadas: < numero >

	    Ve�culo: <Marca_do_Veiculo> - <Modelo_do_Veiculo>
	    Ano de fabrica��o / modelo: <ano_fabricacao> / <ano_modelo>
	    Placa: <numero_da_placa> Renavam: <numero_do_renavam>
	    Categoria: <nome_da_categoria_do_veiculo>

	    Valor da di�ria: <valor_diaria>
	    Valor do seguro de terceiros: <valor_seguro_terceiros>
	    Valor do seguro pr�prio: <valor_seguro_proprio>
	    Valor dos impostos: <valor_impostos>
	    Valor total da loca��o: <valor_total>
	    
	    **/

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDiarias() {
		return diarias;
	}

	public void setDiarias(int diarias) {
		this.diarias = diarias;
	}

	public int getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(int dataInicio) {
		this.dataInicio = dataInicio;
	}

	public int getDataFim() {
		return dataFim;
	}

	public void setDataFim(int dataFim) {
		this.dataFim = dataFim;
	}

	public void setTotal(ValorTotal total) {
		this.total = total;
	}
	
	public void setVeiculo(Veiculo veiculo) {
		this.veiculo = veiculo;
	}
		
	public float getTotal() {
		// Realizar os c�lculos e retornar o valor final.
		// Por enquanto a fun��o retorna valorfinal=0.
		float valorfinal = 0;
		return valorfinal;
	}

}
