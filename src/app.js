function adjustTime(timer, whichTime, amount) {
  var newTime = timer[whichTime] + amount;
  if (newTime < 1) {
    newTime = 1;
  }
  timer[whichTime] = newTime;

  updateDisplay(timer);
}


function startStopTimer(timer) {
  console.log('start/stop timer');

  timer.running = !timer.running;

  updateDisplay(timer);
}


function updateDisplay(timer) {
  console.log('Timer object:');
  console.log(timer);

  var SESSION = 'session';
  var BREAK = 'break';

  // Session & Break time displays
  document.querySelector('#ctrl-break-display').innerText = timer.break;
  document.querySelector('#ctrl-session-display').innerText = timer.session;

  // Update time remaining state
  if (timer.running) {
    if (timer.endTime == null) {
      // Start timer
      var endTimeMilliseconds = Date.now()
      endTimeMilliseconds += timer.remaining.min * 60 * 1000;  // add minutes
      endTimeMilliseconds += timer.remaining.sec * 1000;  // add seconds
      timer.endTime = new Date();
      timer.endTime.setTime(endTimeMilliseconds);

      // Set display update interval
      timer.updateIntervalFunc = window.setInterval(updateDisplay.bind(this, timer), 100);
    }
    var timeRemainingSeconds = (timer.endTime - Date.now()) / 1000;
    timer.remaining.min = Math.floor(timeRemainingSeconds / 60);
    timer.remaining.sec = Math.floor(timeRemainingSeconds - (timer.remaining.min * 60));
    alert('timer.remaining.sec is less than zero! timeRemainingSeconds: ' + timeRemainingSeconds);

  } else if (timer.endTime !== null) {
    // Stop timer

    // Clear update display interval function
    window.clearInterval(timer.updateIntervalFunc);
    timer.updateIntervalFunc = null;

    // Reset time remaining to session inputs
    // This needs work: how to we continue a timer that is already going?
    // Answer: if break or session time have change?
    // Answer 2: this goes in a reset button?
    timer.remaining.type = SESSION;
    timer.remaining.min = timer.session;
    timer.remaining.sec = 0;

    timer.endTime = null;
  }

  // Time remaining display
  var timerMin = "" + timer.remaining.min;
  var timerSec = "";
  if (timer.remaining.sec < 10) {
    timerSec += "0" + timer.remaining.sec;
  } else {
    timerSec += timer.remaining.sec;
  }
  document.querySelector('.ctrl-timer-countdown').innerText = timerMin + ":" + timerSec;
}


function autorun()
{
  var wrappedTimer = {
    break: 5,
    session:25,
    running: false,
    endTime: null,
    remaining: {
      type: 'session',
      min: 24,
      sec: 5
    },
    updateIntervalFunc: null
  };

  // Session & Break time adjustment buttons
  document.querySelector('#ctrl-break-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'break', -1));
  document.querySelector('#ctrl-break-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'break', 1));
  document.querySelector('#ctrl-session-adjust-minus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'session', -1));
  document.querySelector('#ctrl-session-adjust-plus').addEventListener('click', adjustTime.bind(this, wrappedTimer, 'session', 1));

  // Start/Stop buttons
  var startStopElements = document.querySelectorAll('.ctrl-start-stop')
  startStopElements.forEach(function (element) {
    element.addEventListener('click', startStopTimer.bind(this, wrappedTimer));
  }.bind(this));

  updateDisplay(wrappedTimer);
}

if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;
