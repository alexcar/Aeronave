using Manutencao.Aeronaves.Application.Abstracts.Services;
using Manutencao.Aeronaves.Domain.Abstracts.Services;
using Manutencao.Aeronaves.Domain.Models;
using System.Collections.Generic;

namespace Manutencao.Aeronaves.Application.Concretes
{
	public class AeronaveApplication : IAeronaveApplication
	{
		private readonly IAeronaveService _service;

		public AeronaveApplication(IAeronaveService service)
		{
			_service = service;
		}
		
		public void AddAeronave(Aeronave aeronave)
		{
			_service.AddAeronave(aeronave);
		}

		public void DeleteAeronave(Aeronave aeronave)
		{
			_service.DeleteAeronave(aeronave);
		}

		public Aeronave GetAeronave(int id)
		{
			return _service.GetAeronave(id);
		}

		public IEnumerable<Aeronave> GetAeronaves()
		{
			return _service.GetAeronaves();
		}

		public void UpdateAeronave(Aeronave aeronave)
		{
			_service.UpdateAeronave(aeronave);
		}
	}
}
