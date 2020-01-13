using System;

namespace Manutencao.Aeronaves.Domain.Models
{
	public class Aeronave
	{
		public int Id { get; set; }
		public string Modelo { get; set; }
		public int QuantidadeAssento { get; set; }
		public DateTime DataCriacao { get; set; }
	}
}
