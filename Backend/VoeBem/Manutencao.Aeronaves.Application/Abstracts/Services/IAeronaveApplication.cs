using Manutencao.Aeronaves.Domain.Models;
using System.Collections.Generic;

namespace Manutencao.Aeronaves.Application.Abstracts.Services
{
	public interface IAeronaveApplication
	{
		Aeronave GetAeronave(int id);
		IEnumerable<Aeronave> GetAeronaves();
		void AddAeronave(Aeronave aeronave);
		void UpdateAeronave(Aeronave aeronave);
		void DeleteAeronave(Aeronave aeronave);
	}
}
