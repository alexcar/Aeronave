using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Manutencao.Aeronaves.Application.Abstracts.Services;
using Manutencao.Aeronaves.Application.Concretes;
using Manutencao.Aeronaves.Data.DBConfiguration.EFCore;
using Manutencao.Aeronaves.Data.Repository;
using Manutencao.Aeronaves.Domain.Abstracts.Repository;
using Manutencao.Aeronaves.Domain.Abstracts.Services;
using Manutencao.Aeronaves.Domain.Concretes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Manutencao.Aeronaves.Api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IConfiguration>(Configuration);

			services.AddTransient<IAeronaveApplication, AeronaveApplication>();
			services.AddTransient<IAeronaveService, AeronaveService>();
			services.AddTransient<IAeronaveRepository, AeronaveRepository>();

			// services.AddHttpClient();

			services.AddCors(options =>
			{
				options.AddPolicy("AllowOrigin",
						builder => builder.AllowAnyOrigin()
										  .AllowAnyMethod()
										  .AllowAnyHeader());
			});

			services.AddDbContext<ApplicationContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors("AllowOrigin");
			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
