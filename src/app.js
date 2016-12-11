var SESSION = 'session';
var BREAK = 'break';
var UPDATE_INTERVAL = 100;  // milliseconds

function adjustTime(timer, whichTime, amount) {
  var newTime = timer[whichTime] + amount;
  if (newTime < 1) {
    newTime = 1;
  }
  timer[whichTime] = newTime;

  if (timer.remaining.type === whichTime) {
    resetTimer(timer);
  }

  render(timer);
}


function startStopTimer(timer) {
  if (timer.running) {
    stopTimer(timer);
  } else {
    startTimer(timer);
  }

  updateTimer(timer);
}


function startTimer(timer) {
  // Manipulates the state in-place!

  if (timer.remaining.type === BREAK) {
    if (timer.remaining.min <= 0 && timer.remaining.sec <= 0) {
      resetTimer(timer);
    }
  }

  var endTimeMilliseconds = Date.now()
  endTimeMilliseconds += timer.remaining.min * 60 * 1000;  // add minutes
  endTimeMilliseconds += timer.remaining.sec * 1000;  // add seconds
  timer.endTime = new Date();
  timer.endTime.setTime(endTimeMilliseconds);

  // Set display update interval
  timer.updateIntervalFunc = window.setInterval(updateTimer.bind(this, timer), UPDATE_INTERVAL);

  timer.running = true;
}


function stopTimer(timer) {
  // Manipulates the state in-place!

  // Clear update display interval function
  if (timer.updateIntervalFunc !== null) {
    window.clearInterval(timer.updateIntervalFunc);
    timer.updateIntervalFunc = null;
  }

  timer.running = false;
  timer.endTime = null;
}


function resetTimer(timer) {
  // Manipulates the state in-place!

  if (timer.running) {
    stopTimer(timer);
  }

  // Reset time remaining to session inputs
  timer.remaining.type = SESSION;
  timer.remaining.min = timer.session;
  timer.remaining.sec = 0;
}


function updateTimer(timer) {
  // Manipulates the state in-place!

  if (timer.running) {
    // Switch timer if needed
    var timeRemainingSeconds = (timer.endTime - Date.now()) / 1000;
    if (timeRemainingSeconds <= 0) {
      timerReachedZero(timer);
    }

    // Calculate remaining time
    timer.remaining.min = Math.floor(timeRemainingSeconds / 60);
    if (timer.remaining.min < 0) {
      timer.remaining.min = 0;
    }
    timer.remaining.sec = Math.floor(timeRemainingSeconds - (timer.remaining.min * 60));
    if (timer.remaining.sec < 0) {
      timer.remaining.sec = 0;
    }

  }

  render(timer);
}


function timerReachedZero(timer) {
  // Manipulates the state in-place!

  // Always stop the timer
  stopTimer(timer);

  if (timer.remaining.type === SESSION) {
    // Play the sound
    document.getElementById('ctrl-notify-sound').play();

    // Restart the timer as a break if it was a session
    timer.remaining.type = BREAK;
    timer.remaining.min = timer.break;
    timer.remaining.sec = 0;

    startTimer(timer);

  } else if (timer.remaining.type === BREAK) {
    // Play the sound
    document.getElementById('ctrl-notify-sound').play();
  }
}


function render(timer) {

  // Session & Break time displays
  document.querySelector('#ctrl-break-display').innerText = timer.break;
  document.querySelector('#ctrl-session-display').innerText = timer.session;

  // Timer type label
  var timerType = timer.remaining.type;
  timerType = timerType.substr(0, 1).toUpperCase() + timerType.slice(1);
  document.querySelector('.ctrl-timer-label').innerText = timerType;

  // Time remaining display
  var timerMin = "" + timer.remaining.min;
  var timerSec = "";
  if (timer.remaining.sec < 10) {
    timerSec += "0" + timer.remaining.sec;
  } else {
    timerSec += timer.remaining.sec;
  }
  document.querySelector('.ctrl-timer-countdown').innerText = timerMin + ":" + timerSec;

  // Start/Stop label switching
  if (timer.running) {
    document.querySelector('.ctrl-start-stop-label').innerText = "Press to Stop";
  } else {
    document.querySelector('.ctrl-start-stop-label').innerText = "Press to Start";
  }
}


function setupApp() {
  // Initial state
  var wrappedTimer = {
    break: 5,
    session: 25,
    running: false,
    endTime: null,
    remaining: {
      type: SESSION,
      min: 25,
      sec: 0
    },
    updateIntervalFunc: null
  };

  // Session & Break time adjustment buttons
  document.querySelector('#ctrl-break-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, BREAK, -1));
  document.querySelector('#ctrl-break-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, BREAK, 1));
  document.querySelector('#ctrl-session-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, SESSION, -1));
  document.querySelector('#ctrl-session-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, SESSION, 1));

  // Start/Stop buttons
  var startStopElements = document.querySelectorAll('.ctrl-start-stop')
  startStopElements.forEach(function (element) {
    element.addEventListener('click', startStopTimer.bind(this, wrappedTimer));
  }.bind(this));

  render(wrappedTimer);
}


function autorun()
{
  setupApp();
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
