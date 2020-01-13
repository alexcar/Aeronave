using Manutencao.Aeronaves.Application.Abstracts.Services;
using Manutencao.Aeronaves.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Manutencao.Aeronaves.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AeronaveController : ControllerBase
    {
        private readonly IAeronaveApplication _application;
        private readonly ILogger<AeronaveController> _logger;

        public AeronaveController(
            IAeronaveApplication application,
            ILogger<AeronaveController> logger)
        {
            _application = application;
            _logger = logger;
        }

        // GET: api/Aeronave
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_application.GetAeronaves());
        }

        // GET: api/Aeronave/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult Get(int id)
        {
            var aeronave = _application.GetAeronave(id);

            if (aeronave == null)
                return NotFound();

            return Ok(aeronave);
        }

        // POST: api/Aeronave
        [HttpPost]
        public ActionResult Post([FromBody] Aeronave aeronave)
        {
            _application.AddAeronave(aeronave);
            return CreatedAtAction("Get", new { id = aeronave.Id }, aeronave);
        }

        // PUT: api/Aeronave/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Aeronave aeronave)
        {
            if (id != aeronave.Id)
                return BadRequest();

            if (_application.GetAeronave(id) == null)
                return NotFound();

            _application.UpdateAeronave(aeronave);

            return Ok(aeronave);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var aeronave = _application.GetAeronave(id);

            if (aeronave == null)
                return NotFound();

            _application.DeleteAeronave(aeronave);

            return Ok(aeronave);
        }
    }
}
