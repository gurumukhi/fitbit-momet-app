import document from "document";
import * as messaging from "messaging";
import clock from "clock";

let background = document.getElementById("background");
let colorSelection = 'tomato';
let birthDateSelection = '1991-01-01';
let birthTimeSelection = '00:00:00';
let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

clock.granularity = "seconds";
clock.ontick = (evt) => {
   document.getElementById("time").text = evt.date.toTimeString().substr(0,5);
   document.getElementById("day").text = dayArray[new Date(evt.date).getDay()];
}

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    colorSelection = JSON.parse(evt.data.newValue);
    console.log(`New color: ${colorSelection}`);
    background.style.fill = colorSelection;
  } else if (evt.data.key === "birthDate" && evt.data.newValue) {
    birthDateSelection = (JSON.parse(evt.data.newValue)).name;
    console.log(`New date: ${birthDateSelection}`);
  } else if (evt.data.key === "birthTime" && evt.data.newValue) {
    birthTimeSelection = (JSON.parse(evt.data.newValue)).name;
    console.log(`New time: ${birthTimeSelection}`);
  }
  if(isNaN(new Date(birthDateSelection+'T'+birthTimeSelection).getTime())) {
    birthDateSelection = '1990-01-01';
    birthTimeSelection = '00:00:00';
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

function setSeconds() {
  var diff = (((new Date().getTime()) - (new Date(birthDateSelection+'T'+birthTimeSelection).getTime()))/1000).toFixed();
  document.getElementById("seconds").text = diff;
}

setInterval(setSeconds, 1000);