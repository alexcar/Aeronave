using Manutencao.Aeronaves.Domain.Models;
using System.Collections.Generic;

namespace Manutencao.Aeronaves.Domain.Abstracts.Services
{
	public interface IAeronaveService
	{
		Aeronave GetAeronave(int id);
		IEnumerable<Aeronave> GetAeronaves();
		void AddAeronave(Aeronave aeronave);
		void UpdateAeronave(Aeronave aeronave);
		void DeleteAeronave(Aeronave aeronave);
	}
}
