using Manutencao.Aeronaves.Data.DBConfiguration.EFCore;
using Manutencao.Aeronaves.Domain.Abstracts.Repository;
using Manutencao.Aeronaves.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Manutencao.Aeronaves.Data.Repository
{
	public class AeronaveRepository : IAeronaveRepository
	{
		public void AddAeronave(Aeronave aeronave)
		{
			using (var context = new ApplicationContext())
			{
				context.Add(aeronave);
				context.SaveChanges();
			}
		}

		public void DeleteAeronave(Aeronave aeronave)
		{
			using (var context = new ApplicationContext())
			{
				context.Remove(aeronave);
				context.SaveChanges();
			}
		}

		public Aeronave GetAeronave(int id)
		{
			using (var context = new ApplicationContext())
			{
				return context.Aeronave.Find(id);				
			}
		}

		public IEnumerable<Aeronave> GetAeronaves()
		{
			using (var context = new ApplicationContext())
			{
				return context.Aeronave.ToList();
			}
		}

		public void UpdateAeronave(Aeronave aeronave)
		{
			using (var context = new ApplicationContext())
			{
				context.Entry(aeronave).State = EntityState.Modified;
				context.SaveChanges();
			}
		}
	}
}
