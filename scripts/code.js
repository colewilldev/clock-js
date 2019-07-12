const offsets = [
  { zone: 'Tokyo', offset: 9 },
  { zone: 'Denver', offset: -6 },
  { zone: 'SouthAfrica', offset: 2 },
  { zone: 'Miami', offset: -4 }
  
];

const getDate = () => { return new Date() };

let date = getDate();
console.log('UTC hours is: ', date.getUTCHours());

// Rotates A Clock's Hand by updating Css '--rotation';
const setRotation = (el, rotateRatio) => { 
  el.style.setProperty('--rotation', rotateRatio * 360);
}

const setAnalogClock = (timeZone, offset) => {
  const date = getDate();
  let hourString = `[${timeZone}-hour-hand]`;
  let minString = `[${timeZone}-min-hand]`;
  let secString = `[${timeZone}-sec-hand]`;
  const hourHand = document.querySelector(hourString);
  const minHand  = document.querySelector(minString);
  const secHand  = document.querySelector(secString);

  const secondsRot = date.getSeconds() / 60;
  const minutesRot = (secondsRot + date.getMinutes()) / 60
  const hoursRot = (minutesRot + Math.abs(date.getUTCHours() + offset)) / 12
  // console.log(`Seconds Ratio: ${secondsRot} \n $minutes: ${minutesRot} \n hours:${hoursRot}`);
  
  setRotation(hourHand, hoursRot);
  setRotation(secHand, secondsRot);
  setRotation(minHand, minutesRot);
}

//  Converts Hours From 1-24 to 1-12...
const notMilitary = (hr) => {
  if (hr > 24) { 
    console.log('24 change hr in : ', hr);
    let test = hr -= 24;
    console.log('THe Right Hrs? :', test);
  } else if (hr > 12) {
    return hr -= 12;
  } else if (hr === 0) { 
    return 12;
  }
  return hr;
}

const displayDigitalClock = (timeZone, offset) => { 
  const date = getDate();
  const sec = addZero(date.getSeconds());
  const min = addZero(date.getMinutes());
  const hr = date.getUTCHours();
  const finalHr = Math.abs(hr + offset);
  // console.log('FINAL HR: ', finalHr);
  // console.log('math.abs + offset ', Math.abs(finalHr + offset));
  // console.log('not military(hr): ', notMilitary(finalHr));
  console.log(timeZone);
  let string = `[${timeZone}-digital-clock]`;
  console.log(string);
  const digital = document.querySelector(string);
  console.log(`TARGET: ${digital}`);
  digital.innerHTML = `${notMilitary(finalHr)} : ${min} : ${sec}`;
}

// Adds a 0 for the Digital Clock Display Numbers
const addZero = num => { 
  if (num > 10) {
    return num;
  } else { 
    return "0" + num;
  }
}

// Runs All of the code every 1000ms to update the clocks
setInterval(() => { 
  offsets.forEach(el => {
    displayDigitalClock(el.zone, el.offset);
    setAnalogClock(el.zone, el.offset);
  })
}, 4000);
