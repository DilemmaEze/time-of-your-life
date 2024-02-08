namespace time.Controllers;

public class ClockProps {
  public Guid Id {get; set;} = Guid.NewGuid();
  public string FontFamily {get; set;} = "courier";
  public int[] AvailableFontSizes {get; }  = new[] { 12, 24, 48, 64 };
  public int TitleFontSize {get; set;} = 64;
  public int ClockFontSize {get ; set;} = 48;
  public bool BlinkColons {get; set;} = true;
  public string FontColor {get; set;} = "black";
  public string TitleText {get; set;} = "The Time of Your Life";
}