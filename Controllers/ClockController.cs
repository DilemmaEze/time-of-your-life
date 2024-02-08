using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace time.Controllers;

[ApiController]
[Route("[controller]")]
public class ClockController : ControllerBase
{
    private static List<ClockProps> _presets = new List<ClockProps>(){ new() };

    private readonly ILogger<ClockController> _logger;

    public ClockController(ILogger<ClockController> logger)
    {
        _logger = logger;
    }

    [HttpGet, Route("timeStamp")]
    public long GetTimestamp()
    {
        long timeStamp = (long)(DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;
        return timeStamp;
    }

    [HttpGet, Route("presets")]
    public IEnumerable<ClockProps> GetPresets()
    {
        return _presets.ToArray();
    }

    [HttpPost("presets")]
    public ClockProps AddPreset([FromBody]ClockProps preset)
    {
        preset.Id = Guid.NewGuid();
        _presets.Add(preset);
        return preset;
    }

    [HttpGet, Route("GetPresetById/{id}")]
    public ClockProps GetPresetById(Guid id)
    {   
        return _presets.FirstOrDefault(x => x.Id == id);
    }

    [HttpPost("UpdatePreset")]
    public IEnumerable<ClockProps> UpdatePreset([FromBody]ClockProps preset)
    {
        int updatedIndex = _presets.FindIndex(x => x.Id == preset.Id);
        _presets[updatedIndex] = preset;
        
        return _presets;
    }
}
