const offsets = [
  { zone: 'Tokyo', offset: 9 },
  { zone: 'Denver', offset: -6 },
  { zone: 'SouthAfrica', offset: 2 },
  { zone: 'Miami', offset: -4 }
];

// Instantiates the date...
const getDate = () => { return new Date() };

// Rotates A Clock's Hand by updating Css '--rotation' value;
const setRotation = (el, rotateRatio) => { 
  if (el) { 
    el.style.setProperty('--rotation', rotateRatio * 360);
  }
}

const setAnalogClock = (timeZone, offset) => {
  const date = getDate();
  const hourString = `[${timeZone}-hour-hand]`;
  const minString = `[${timeZone}-min-hand]`;
  const secString = `[${timeZone}-sec-hand]`;
  const hourHand = document.querySelector(hourString);
  const minHand  = document.querySelector(minString);
  const secHand  = document.querySelector(secString);
  
  // Gets 3 Numbers that represent the amount of rotation for sec, min, hours
  const secondsRot = date.getSeconds() / 60;
  const minutesRot = (secondsRot + date.getMinutes()) / 60;
  // The Hours have to be offset for each time zone
  const hoursVar = date.getUTCHours() + offset;
  // Counts Back from 24 to account for Negative UTC offset values...
  let hours = hoursVar < 0 ? hoursVar + 24 : hoursVar;
  // Gets the rotation number for hours
  const hoursRot =(minutesRot + hours) / 12;
  setRotation(hourHand, hoursRot);
  setRotation(secHand, secondsRot);
  setRotation(minHand, minutesRot);
}

//  Converts Hours From 1-24 to 1-12, for the Digital Clocks
const notMilitary_ampm = (hr) => {
  console.log("notMilitary_ampm(hr): ", hr);
  let hours = hr;
  if (hr < 0) { 
    hours = 24 + hr ;
  }
  if (hours > 24) {
    return [hours -= 24, "AM"];
  } else if (hours > 12) {
    return [hours -= 12, "PM"];
  } else if (hours === 0) { 
    return [12, "AM"];
  }
  return [hours, "AM"];
}

// Adds a 0 for the Digital Clock Display Numbers...
const addZero = num => { 
  if (num > 9) {
    return num;
  } else { 
    return "0" + num;
  }
}
// Updates The Digital Clock Displays
const displayDigitalClock = (timeZone, offset) => { 
  const date = getDate();
  const sec = addZero(date.getSeconds());
  const min = addZero(date.getMinutes());
  const hr = date.getUTCHours();
  const finalHr = hr + offset;
  
  let string = `[${timeZone}-digital-clock]`;
  const digital = document.querySelector(string);
  digital.innerHTML = `${addZero(notMilitary_ampm(finalHr)[0])} : ${min} : ${sec} ${notMilitary_ampm(finalHr)[1]}`;
}

// Loops Through my Array of Clocks and updates all displays every 1000ms
setInterval(() => { 
  offsets.forEach(el => {
    displayDigitalClock(el.zone, el.offset);
    setAnalogClock(el.zone, el.offset);
  })
}, 1000);
