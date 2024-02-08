import { useState, useEffect } from 'react'
import ClockProps from './ClockProps'

function SetClockProps(props) {
  const clockProps = new ClockProps()
  const [titleText, setTitleText] = useState(clockProps.titleText);
  const [fontFamily, setFontFamily] = useState(clockProps.fontFamily)
  const [fontColor, setFontColor] = useState(clockProps.fontColor)
  const [blinkColons, setBlinkColons] = useState(clockProps.blinkColons)
  const [titleFontSize, setTitleFontSize] = useState(clockProps.titleFontSize)
  const [clockFontSize, setClockFontSize] = useState(clockProps.clockFontSize)
  const [presets, setPresets] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    ; (async () => {
      const response = await fetch('clock/presets')
      const data = await response.json()
      setPresets(data)
      setLoading(false)
    })()
  }, [])

  const refreshData = () => {
    console.log()
    ; (async () => {
      const response = await fetch('clock/presets')
      const data = await response.json()
      setPresets(data)
      setLoading(false)
    })()
  }

  const getProps = () => {
    const props = new ClockProps()
    props.fontFamily = document.getElementById('fontFamily').value
    props.titleFontSize = titleFontSize;
    props.clockFontSize = document.getElementById('clockFontSize').value
    props.fontColor = document.getElementById('fontColor').value
    props.blinkColons = document.getElementById('blinkColons').checked;

    props.titleText = document.getElementById('titleText').value;
    return props
  }

  const setClockProps = () => {
    const setProps = getProps()
    props.setClockProps(setProps);  
  }

  const fontSizeOptions = (selctedSize) => {
    return clockProps.availableFontSizes.map((size) => {
      var option = <option>{size}</option>
      if (size === selctedSize) {
        option = <option selected>{size}</option>
      }
      return option
    })
  }

  const setFontFamilyUI = () => {
    setFontFamily(document.getElementById('fontFamily').value)
    clockProps.fontFamily = document.getElementById('fontFamily').value
  }

  const setFontColurUI = (e) => {
    setFontColor(document.getElementById('fontColor').value)
    clockProps.fontColor = document.getElementById('fontColor').value
  }

  const setBlinkColonsUI = () => {
    setBlinkColons(document.getElementById('blinkColons').checked)
    clockProps.blinkColons = document.getElementById('blinkColons').checked
    setClockProps()
  }

  //DMZ: Sets the new title
  const setTitleTextUI = () => {
    setTitleText(document.getElementById('titleText').value)
    clockProps.titleText = document.getElementById('titleText').value
  }

  //DMZ: Check for enter
  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setClockProps()
    }
  }

  //DMZ: Save Preset
  const savePreset = () => {
    const configInfo = getProps();

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configInfo)
    }  

    fetch('clock/presets', reqOptions)
      .then(() => {refreshData()})
  }

  //DMZ Handle title font size
  const handleTitleFontSize = (event) => {
    setTitleFontSize(event.target.value);
  }

  //DMZ Handle clock font size
  const handleClockFontSize = (event) => {
    setClockFontSize(event.target.value);
  }

  useEffect(() => {
    setClockProps();
  }, [titleFontSize, clockFontSize])


  const presetsDisplay = (() => {
    console.log(presets)
    return loading ? (
      <div>
        This is a good place to display and use the presets stored on the sever.
      </div>
    ) : (
      <ul>
        {presets.map((p, i) => (
          <li>
            Preset {i + 1}:{' '}
            {`Font: ${p.fontFamily}, Color: ${p.fontColor}, Title Size: ${p.titleFontSize}, Clock Size: ${p.clockFontSize}`}
          </li>
        ))}
      </ul>
    )
  })()

  return (
    <div id="ClockProps" style={{ overflow: 'auto' }}>
      <div
        style={{
          float: 'left',
          width: '40px',
          height: '100%',
          border: '1px solid white',
          fontSize: '20pt',
        }}
      >
        <a
          style={{ cursor: 'pointer' }}
          onClick={() =>
            alert(
              'This the button that would expand or collapse the settings panel.'
            )
          }
        >
          +/-
        </a>
      </div>
      <div>
        <div>
          <h1>Clock Properties</h1>
          <hr />
        </div>
        <div>
          <div>
            <h2>Settings</h2>
          </div>
          <div>
            <div>Clock Title</div>
            <div>
              <input
                id="titleText"
                value={titleText}
                onChange={setTitleTextUI}
                onKeyDown={handleEnter}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
          </div>
          <div>
            <div>Font Family</div>
            <div>
              <input
                id="fontFamily"
                value={fontFamily}
                onChange={setFontFamilyUI}
                onKeyDown={handleEnter}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
          </div>
          <div>
            <div>Title Font Size</div>
            <div>
              <div class="slidecontainer">
                <input type="range" min="12" max="64" value={titleFontSize} onChange={handleTitleFontSize} step="2" class="slider" id="titleFontSize" />
              </div>
            </div>
          </div>
          <div>
            <div>Clock Font Size</div>
            <div>
              <div class="slidecontainer">
                <input type="range" min="12" max="64" value={clockFontSize} onChange={handleClockFontSize} step="2" class="slider" id="clockFontSize" />
              </div>
            </div>
          </div>
          <div>
            <div>Font Color</div>
            <div>
              <input
                id="fontColor"
                value={fontColor}
                onChange={(e) => setFontColurUI(e)}
                onKeyDown={handleEnter}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
          </div>
          <div>
            <div>Blink Colons</div>
            <div>
              <input
                id="blinkColons"
                checked={blinkColons}
                type="checkbox"
                onChange={setBlinkColonsUI}
              />
            </div>
          </div>
          <div>
            <div>
              <button
                onClick={() =>
                  savePreset()
                }
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h2>Presets</h2>
          <div>{presetsDisplay}</div>
        </div>
      </div>
    </div>
  )
}

export default SetClockProps
