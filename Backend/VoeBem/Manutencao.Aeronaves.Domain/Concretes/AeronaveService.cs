using Manutencao.Aeronaves.Domain.Abstracts.Repository;
using Manutencao.Aeronaves.Domain.Abstracts.Services;
using Manutencao.Aeronaves.Domain.Models;
using System.Collections.Generic;

namespace Manutencao.Aeronaves.Domain.Concretes
{
	public class AeronaveService : IAeronaveService
	{
		private readonly IAeronaveRepository _repository;

		public AeronaveService(IAeronaveRepository repository)
		{
			_repository = repository;
		}
		
		public void AddAeronave(Aeronave aeronave)
		{
			_repository.AddAeronave(aeronave);
		}

		public void DeleteAeronave(Aeronave aeronave)
		{
			_repository.DeleteAeronave(aeronave);
		}

		public Aeronave GetAeronave(int id)
		{
			return _repository.GetAeronave(id);
		}

		public IEnumerable<Aeronave> GetAeronaves()
		{
			return _repository.GetAeronaves();
		}

		public void UpdateAeronave(Aeronave aeronave)
		{
			_repository.UpdateAeronave(aeronave);
		}
	}
}
