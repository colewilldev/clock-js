const offsets = [
  // { zone: 'Tokyo', offset: 9 },
  // { zone: 'Denver', offset: -6 },
  // { zone: 'SouthAfrica', offset: 2 },
  { zone: 'Miami', offset: -4 }
  
];

const getDate = () => { return new Date() };

let date = getDate();
console.log(getDate());
console.log('UTC hours is: ', date.getUTCHours());

// Rotates A Clock's Hand by updating Css '--rotation';
const setRotation = (el, rotateRatio) => { 
  if (el) { 
    el.style.setProperty('--rotation', rotateRatio * 360);
  }
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

const notMilitary_ampm = (hr) => {
  console.log("notMilitary_ampm(hr): ", hr);
  let hours = hr;
  if (hr < 0) { 
    hours = 24 + hr ;
  }
  console.log('!!! ', hours);
  if (hours > 24) {
    
    console.log('24 change hr in : ', hours);
    return [hours -= 24, "AM"];

  } else if (hours > 12) {
    console.log('2nd if');
    return [hours -= 12, "PM"];

  } else if (hours === 0) { 
    console.log('hr in miltime = ', hr);
    console.log('returning', [12, "AM"]);
    return [12, "AM"];
  }
  console.log('doesnt match any ifs returning:', hr);
  return [hours, "AM"];
}

const displayDigitalClock = (timeZone, offset) => { 
  const date = getDate();
  const sec = addZero(date.getSeconds());
  const min = addZero(date.getMinutes());
  const hr = date.getUTCHours();
  const finalHr = hr + offset;
  // console.log('Target: ',notMilitary_ampm(finalHr)[0], notMilitary_ampm(finalHr)[1]);
  // console.log('FINAL HR: ', finalHr);
  // console.log('math.abs + offset ', Math.abs(finalHr + offset));
  // console.log('not military(hr): ', notMilitary_ampm(finalHr));
  // let merid = finalHr > 12 ? "PM" : "AM"; 
  let string = `[${timeZone}-digital-clock]`;
  
  const digital = document.querySelector(string);
  
  digital.innerHTML = `${addZero(notMilitary_ampm(finalHr)[0])} : ${min} : ${sec} ${notMilitary_ampm(finalHr)[1]}`;
}

// Adds a 0 for the Digital Clock Display Numbers
const addZero = num => { 
  if (num > 9) {
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
}, 1000);
