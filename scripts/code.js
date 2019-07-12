const offsets = [
  // { zone: 'PacificTime',  offset: -8 },
  { zone: 'MountainTime', offset: -6 },
  // { zone: 'CentralTime',  offset: -6 },
  // { zone: 'EasternTime',  offset: -4 }
  
];


const getDate = () => { return new Date() };

const setRotation = (el, rotateRatio) => { 
  console.log('Target: ', el);
  el.style.setProperty('--rotation', rotateRatio * 360);
  console.log()
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
  const hoursRot = (minutesRot + date.getHours()) / 12
  // console.log(`Seconds Ratio: ${secondsRot} \n $minutes: ${minutesRot} \n hours:${hoursRot}`);
  
  // setRotation(hourHand, hoursRot);
  setRotation(secHand, secondsRot);
  // setRotation(minHand, minutesRot);
}



const digiSec = document.querySelector(['digi-sec']);

const notMilitary = (hr) => {
  
  if (hr > 12) {
    let ans = hr -= 12;
    console.log("TARGET: ", ans);
  } else if (hr === 0) { 
    return 12;
  }
  return hr;
}

const displayDigitalClock = (timeZone, offset) => { 
  const date = new Date();
  const sec = addZero(date.getSeconds());
  const min = addZero(date.getMinutes());
  const hr = date.getUTCHours();
  const finalHr = Math.abs(hr + offset);
  // Updates The Clock Display
  const digital = document.querySelector('['+timeZone+'-digital-clock]');
  digital.innerHTML = `${notMilitary(finalHr)} : ${min} : ${sec}`;
}

const addZero = num => { 
  if (num > 10) {
    return num;
  } else { 
    return "0" + num;
  }
}



setInterval(() => { 
  offsets.forEach(el => {
    // displayDigitalClock(el.zone, el.offset);
    setAnalogClock(el.zone, el.offset);
  })
}, 1000);
