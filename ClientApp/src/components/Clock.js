import { useState, useEffect } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date())
  const [dateDiff, setDateDiff] = useState(0)

  function refreshClock() {
    //TBD use date diff to get correct server time
    setDate(new Date());
  }

  useEffect(() => {
    fetch('clock/timeStamp').then((response) => response.text())
      .then((timeStamp) => {
        setDateDiff(timeStamp - date.getTime());
      })

    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  let displayText = date.toLocaleTimeString()
  if (props.clockProps.blinkColons & (date.getSeconds() % 2 === 0)) {
    displayText = displayText.replace(/:/g, ' ')
  }

  const stringifyDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const meridian = hours >= 12 ? 'PM' : 'AM';

    let wordHours = "";
    let wordMinutes = "";

    const numbersToWords = {
      0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four',
      5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine',
      10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen',
      14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen',
      18: 'eighteen', 19: 'nineteen', 20: 'twenty', 30: 'thirty',
      40: 'forty', 50: 'fifty'
    };

    if (hours == 0) {
      wordHours = numbersToWords[12];
    }else{
      wordHours = numbersToWords[hours];
    }

    if (minutes > 20 && minutes < 30) {
      wordMinutes = numbersToWords[20] + " " + numbersToWords[minutes-20];
    }else if (minutes > 30 && minutes < 40) {
      wordMinutes = numbersToWords[30] + " " + numbersToWords[minutes-30];
    }else if (minutes > 40 && minutes < 50) {
      wordMinutes = numbersToWords[40] + " " + numbersToWords[minutes-40];
    }else if (minutes > 50 && minutes < 60) {
      wordMinutes = numbersToWords[50] + " " + numbersToWords[minutes-50];
    }else if (minutes == 0){
      wordMinutes = ""
    }else{
      wordMinutes = numbersToWords[minutes];
    }
    
    return wordHours + " " + wordMinutes + " " + meridian;
  }

  let displayStyle = {
    fontFamily: props.clockProps.fontFamily,
    color: props.clockProps.fontColor,
  }

  let titleStyle = {
    fontSize: `${props.clockProps.titleFontSize}pt`,
  }

  let clockStyle = {
    fontSize: `${props.clockProps.clockFontSize}pt`,
  }

  return (
    <div id="Clock">
      <div id="Digits" style={displayStyle}>
        <div id="title" style={titleStyle}>
          {props.clockProps.titleText}
        </div>
        <div id="time" style={clockStyle}>
          {displayText}
        </div>
        <div style={clockStyle}>
          {props.clockProps.timeText && stringifyDate(date)}
        </div>
      </div>
    </div>
  );
}

export default Clock
